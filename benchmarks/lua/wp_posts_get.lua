-- GET /wp/v2/posts - Fetch posts (authenticated with JWT Bearer)
-- Reads JWT from env: WRK_JWT

local jwt = os.getenv("WRK_JWT") or ""

if jwt == "" then
    error("WRK_JWT env var is required for wp_posts_get.lua")
end

wrk.method = "GET"
wrk.headers["Content-Type"] = "application/json"
wrk.headers["Authorization"] = "Bearer " .. jwt
