-- POST /wp/v2/posts - Create a draft post (authenticated with JWT Bearer)
-- Reads JWT from env: WRK_JWT

local jwt = os.getenv("WRK_JWT") or ""

if jwt == "" then
    error("WRK_JWT env var is required for wp_posts_post.lua")
end

wrk.method = "POST"
wrk.headers["Content-Type"] = "application/json"
wrk.headers["Authorization"] = "Bearer " .. jwt
wrk.body = '{"title":"Benchmark Post","content":"Benchmark content","status":"draft"}'
