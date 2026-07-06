-- POST /auth/refresh - Exchange a refresh token for a new JWT
-- Reads token from env: WRK_REFRESH_TOKEN

local refresh_token = os.getenv("WRK_REFRESH_TOKEN") or ""

if refresh_token == "" then
    error("WRK_REFRESH_TOKEN env var is required for refresh_post.lua")
end

wrk.method  = "POST"
wrk.headers["Content-Type"] = "application/json"
wrk.body    = string.format('{"refresh_token":"%s"}', refresh_token)
