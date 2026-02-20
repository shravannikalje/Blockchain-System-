# Railway Backend Deploy

Backend is configured for Railway:
- Dynamic port via `server.port=${PORT:8080}`
- Health endpoint: `/api/health`
- Docker deploy ready

## Steps

1. Install Railway CLI:
   - `npm install -g railway`
   - Or download from: https://railway.app

2. Login and init:
   ```
   railway login
   cd backend
   railway init
   ```

3. Select project or create new:
   - Name: `chainsys-backend`

4. Deploy:
   ```
   railway up
   ```

5. Copy public URL from Railway dashboard.
   - Format: `https://<project-name>.up.railway.app`

6. Update `js/config.js` with backend URL:
   - `API_BASE_URL: "https://<your-railway-domain>/api"`

## Railway auto-detects:
- Dockerfile
- Port from `PORT` env
- Health check on `/api/health`

---

## Alternative: Manual Docker Push

1. Build image:
   ```
   cd backend
   docker build -t chainsys-backend .
   ```

2. Push to Railway registry.
