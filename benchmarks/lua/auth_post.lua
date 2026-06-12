-- POST /auth - Authenticate and obtain a JWT
-- Reads credentials from env: WRK_USERNAME, WRK_PASSWORD, WRK_AUTH_CODE (optional)

local username  = os.getenv("WRK_USERNAME") or "admin"
local password  = os.getenv("WRK_PASSWORD") or "password"
local auth_code = os.getenv("WRK_AUTH_CODE")

local body
if auth_code and auth_code ~= "" then
    body = string.format('{"username":"%s","password":"%s","AUTH_CODE":"%s"}', username, password, auth_code)
else
    body = string.format('{"username":"%s","password":"%s"}', username, password)
end

wrk.method  = "POST"
wrk.headers["Content-Type"] = "application/json"
wrk.body    = body
