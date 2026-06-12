-- POST /users - Register a new WordPress user
-- Each request uses a unique email to avoid 409 conflicts.
-- Reads config from env: WRK_AUTH_CODE (optional), WRK_REGISTER_PASSWORD

local password  = os.getenv("WRK_REGISTER_PASSWORD") or "BenchmarkPass123!"
local auth_code = os.getenv("WRK_AUTH_CODE")

local counter = 0

function request()
    counter = counter + 1
    local email = string.format("bench_%d_%d@example.com", os.time(), counter)

    local body
    if auth_code and auth_code ~= "" then
        body = string.format(
            '{"email":"%s","password":"%s","AUTH_CODE":"%s"}',
            email, password, auth_code
        )
    else
        body = string.format('{"email":"%s","password":"%s"}', email, password)
    end

    return wrk.format("POST", nil, {["Content-Type"] = "application/json"}, body)
end
