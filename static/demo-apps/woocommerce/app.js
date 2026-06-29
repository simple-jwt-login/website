/* WooCommerce + Simple-JWT-Login - vanilla JS demo.
 * Everything is authenticated with a JWT in the Authorization header:
 *   - Products  : /wc/v3/products        (CRUD, needs an admin/shop-manager token)
 *   - Cart      : /wc/store/v1/cart       (Store API)
 *   - Checkout  : /wc/store/v1/checkout   (Store API - needs the "Store API cart &
 *                 checkout" toggle enabled in the plugin so the nonce is skipped)
 */

'use strict';

const STORE_KEY = 'sjl_wc_demo';
const NS = '/simple-jwt-login/v1';

const state = { baseUrl: '', jwt: '', user: null };

/* ----------------------------- persistence ----------------------------- */
function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
        state.baseUrl = saved.baseUrl || '';
        state.jwt = saved.jwt || '';
    } catch (_) { /* ignore */ }
}
function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify({ baseUrl: state.baseUrl, jwt: state.jwt }));
}

/* ----------------------------- tiny helpers ---------------------------- */
const $ = (id) => document.getElementById(id);

let toastTimer = null;
function toast(message, kind = 'ok') {
    const el = $('toast');
    el.textContent = message;
    el.className = `toast ${kind}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 4500);
}

/* Pull the most human-readable message out of a WP/WooCommerce error body. */
function apiErrorMessage(err) {
    const d = err && err.data;
    if (!d) return err && err.message ? err.message : 'Request failed';
    return (d.data && d.data.message) || d.message || err.message || 'Request failed';
}

function log(label, payload, kind = '') {
    const el = $('log');
    const time = new Date().toLocaleTimeString();
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    el.innerHTML += `<span class="dim">[${time}]</span> <span class="${kind}">${label}</span>\n${body}\n\n`;
    el.scrollTop = el.scrollHeight;
}

/* Core fetch wrapper - attaches the bearer token to every request. */
async function api(path, { method = 'GET', body } = {}) {
    const base = state.baseUrl.replace(/\/+$/, '');
    const url = `${base}/wp-json${path}`;
    const headers = { 'Content-Type': 'application/json' };
    if (state.jwt) headers['Authorization'] = `Bearer ${state.jwt}`;

    log(`${method} ${path}`, body || '(no body)', 'dim');
    const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch (_) { data = text; }

    if (!res.ok) {
        log(`<- ${res.status} ${method} ${path}`, data, 'err');
        const err = new Error(`HTTP ${res.status}`);
        err.data = data;
        throw err;
    }
    log(`<- ${res.status} ${method} ${path}`, data, 'ok');
    return data;
}

/* Store API prices come back as integer minor units (e.g. "1299"). */
function money(minor, totals) {
    const unit = totals && typeof totals.currency_minor_unit === 'number' ? totals.currency_minor_unit : 2;
    const code = (totals && totals.currency_code) || '';
    const value = (parseInt(minor, 10) / Math.pow(10, unit)).toFixed(unit);
    return `${value} ${code}`.trim();
}

/* ------------------------------ auth flow ------------------------------ */
async function authenticateWithPassword(email, password) {
    const data = await api(`${NS}/auth`, { method: 'POST', body: { email, password } });
    const jwt = (data && data.data && data.data.jwt) || data.jwt;
    if (!jwt) throw new Error('No JWT in response');
    return jwt;
}

async function validateToken() {
    // Confirms the token works and returns the WP user behind it.
    return api(`${NS}/auth/validate`, { method: 'GET' });
}

function describeUser(validateResponse) {
    const u = validateResponse && validateResponse.data && validateResponse.data.user;
    if (!u) return 'authenticated';
    return u.user_email || u.display_name || u.user_login || `user #${u.ID || ''}`;
}

/* --------------------------- screen switching -------------------------- */
function showApp() {
    $('loginScreen').classList.add('hidden');
    $('app').classList.remove('hidden');
    $('whoami').textContent = state.user ? `Signed in as ${state.user}` : '';
}
function showLogin(message) {
    $('app').classList.add('hidden');
    $('loginScreen').classList.remove('hidden');
    $('loginError').textContent = message || '';
}

async function tryResumeSession() {
    $('baseUrl').value = state.baseUrl;
    if (!state.baseUrl || !state.jwt) { showLogin(''); return; }
    try {
        const me = await validateToken();
        state.user = describeUser(me);
        showApp();
    } catch (_) {
        state.jwt = '';
        saveState();
        showLogin('Saved session expired - please log in again.');
    }
}

/* ------------------------------ login UI ------------------------------- */
let tokenMode = false;

function wireLogin() {
    $('toggleMode').addEventListener('click', () => {
        tokenMode = !tokenMode;
        $('credsFields').classList.toggle('hidden', tokenMode);
        $('tokenField').classList.toggle('hidden', !tokenMode);
        $('toggleMode').textContent = tokenMode
            ? 'Use email & password instead'
            : 'Use an existing token instead';
    });

    $('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        $('loginError').textContent = '';
        const btn = $('loginBtn');
        btn.disabled = true;
        try {
            state.baseUrl = $('baseUrl').value.trim();
            if (!state.baseUrl) throw new Error('Enter the site URL');

            if (tokenMode) {
                state.jwt = $('jwt').value.trim();
                if (!state.jwt) throw new Error('Paste a JWT');
            } else {
                state.jwt = await authenticateWithPassword(
                    $('loginEmail').value.trim(),
                    $('loginPassword').value
                );
            }

            const me = await validateToken();
            state.user = describeUser(me);
            saveState();
            showApp();
        } catch (err) {
            const detail = err.data && err.data.data && err.data.data.message
                ? err.data.data.message
                : (err.data && err.data.message) || err.message;
            showLogin('');
            $('loginError').textContent = `Login failed: ${detail}`;
        } finally {
            btn.disabled = false;
        }
    });
}

function logout() {
    state.jwt = '';
    state.user = null;
    saveState();
    showLogin('You have been logged out.');
}

/* ------------------------------ products ------------------------------- */
async function loadProducts() {
    const products = await api('/wc/v3/products?per_page=20&status=publish');
    const rows = $('productRows');
    if (!Array.isArray(products) || products.length === 0) {
        rows.innerHTML = '<tr><td colspan="4" class="muted">No products.</td></tr>';
        return;
    }
    rows.innerHTML = products.map((p) => `
        <tr>
            <td>${p.id}</td>
            <td>${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.price || p.regular_price || '')}</td>
            <td>
                <button class="small" data-add="${p.id}">Add to cart</button>
                <button class="danger" data-del="${p.id}">Delete</button>
            </td>
        </tr>`).join('');
}

async function createProduct(name, price) {
    await api('/wc/v3/products', {
        method: 'POST',
        body: { name, type: 'simple', regular_price: String(price) }
    });
    await loadProducts();
}

async function deleteProduct(id) {
    await api(`/wc/v3/products/${id}?force=true`, { method: 'DELETE' });
    await loadProducts();
}

/* -------------------------------- cart --------------------------------- */
async function loadCart() {
    renderCart(await api('/wc/store/v1/cart'));
}
async function addToCart(productId) {
    const cart = await api('/wc/store/v1/cart/add-item', {
        method: 'POST', body: { id: Number(productId), quantity: 1 }
    });
    renderCart(cart);
    const count = (cart.items || []).reduce((n, it) => n + it.quantity, 0);
    toast(`Added to cart (${count} item${count === 1 ? '' : 's'} total)`, 'ok');
}
async function removeFromCart(key) {
    renderCart(await api('/wc/store/v1/cart/remove-item', {
        method: 'POST', body: { key }
    }));
}

function renderCart(cart) {
    const rows = $('cartRows');
    const items = (cart && cart.items) || [];
    if (items.length === 0) {
        rows.innerHTML = '<tr><td colspan="4" class="muted">Cart is empty.</td></tr>';
    } else {
        rows.innerHTML = items.map((it) => `
            <tr>
                <td>${escapeHtml(it.name)}</td>
                <td>${it.quantity}</td>
                <td>${money(it.totals.line_total, cart.totals)}</td>
                <td><button class="danger" data-rm="${it.key}">remove</button></td>
            </tr>`).join('');
    }
    $('cartTotal').textContent = cart && cart.totals
        ? `Total: ${money(cart.totals.total_price, cart.totals)}`
        : '';
}

/* ------------------------------ checkout ------------------------------- */
async function placeOrder() {
    const address = {
        first_name: $('b_first').value,
        last_name: $('b_last').value,
        address_1: $('b_addr').value,
        city: $('b_city').value,
        state: $('b_state').value,
        postcode: $('b_post').value,
        country: $('b_country').value.toUpperCase(),
        email: $('b_email').value,
        phone: $('b_phone').value
    };
    const order = await api('/wc/store/v1/checkout', {
        method: 'POST',
        body: {
            billing_address: address,
            shipping_address: address,
            payment_method: $('payment').value,
            customer_note: 'Placed from the vanilla JS JWT demo'
        }
    });
    const num = order.order_number || order.order_id || '?';
    $('orderState').textContent = `Order #${num} created - status: ${order.status || 'ok'}`;
    await loadCart();
}

/* ------------------------------ app wiring ----------------------------- */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function guard(fn) {
    return async (...args) => {
        try { await fn(...args); }
        catch (err) { toast(apiErrorMessage(err), 'err'); }
    };
}

function wireApp() {
    $('logoutBtn').addEventListener('click', logout);
    $('clearLog').addEventListener('click', () => { $('log').innerHTML = ''; });

    $('loadProducts').addEventListener('click', guard(loadProducts));
    $('createProductForm').addEventListener('submit', guard(async (e) => {
        e.preventDefault();
        await createProduct($('newName').value.trim(), $('newPrice').value);
        e.target.reset();
    }));
    $('productRows').addEventListener('click', guard(async (e) => {
        const add = e.target.getAttribute('data-add');
        const del = e.target.getAttribute('data-del');
        if (add) await addToCart(add);
        if (del && confirm(`Delete product #${del}?`)) await deleteProduct(del);
    }));

    $('loadCart').addEventListener('click', guard(loadCart));
    $('cartRows').addEventListener('click', guard(async (e) => {
        const key = e.target.getAttribute('data-rm');
        if (key) await removeFromCart(key);
    }));

    $('placeOrder').addEventListener('click', guard(placeOrder));
}

/* -------------------------------- boot --------------------------------- */
loadState();
wireLogin();
wireApp();
tryResumeSession();
