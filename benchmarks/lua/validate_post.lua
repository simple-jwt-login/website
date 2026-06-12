-- POST /auth/validate - Validate a JWT (body variant)
-- Reads JWT from env: WRK_JWT

local jwt = os.getenv("WRK_JWT") or ""

if jwt == "" then
    error("WRK_JWT env var is required for validate_post.lua")
end

wrk.method  = "POST"
wrk.headers["Content-Type"] = "application/json"
wrk.body    = string.format('{"JWT":"%s"}', jwt)
