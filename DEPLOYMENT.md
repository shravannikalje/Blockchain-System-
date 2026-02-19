# ChainSys VR Deployment Guide

## 1) Frontend deploy to GitHub Pages (Best)

This project is already configured with workflow:
- `.github/workflows/deploy-frontend-gh-pages.yml`

### Steps
1. Push this project to GitHub repository.
2. Keep default branch as `main`.
3. In GitHub repo: **Settings > Pages**
   - Build and deployment source: **GitHub Actions**
4. After push, workflow will auto-deploy frontend.

Your site URL format will be:
- `https://<your-username>.github.io/<repo-name>/`

---

## 2) Backend deploy (Render - Docker)

Backend deploy files added:
- `backend/Dockerfile`
- `backend/render.yaml`
- Health endpoint: `/api/health`

### Steps
1. Create account on Render.
2. Connect GitHub repository.
3. New Web Service -> Select `backend` folder.
4. Render auto-detects Docker + `render.yaml`.
5. Deploy and copy public URL.

Backend URL example:
- `https://chainsys-backend.onrender.com`

API base URL:
- `https://chainsys-backend.onrender.com/api`

---

## 3) Connect Frontend to Deployed Backend

Update file: `js/config.js`

Set:
- `API_BASE_URL: "https://<your-backend-domain>/api"`

Example:
- `API_BASE_URL: "https://chainsys-backend.onrender.com/api"`

Commit and push again. GitHub Pages will redeploy automatically.

---

## 4) Local run (optional)

### Frontend
Open `INDEX.HTML` in browser.

### Backend
From `backend` folder run:
- `mvn spring-boot:run`

Then API health:
- `http://localhost:8080/api/health`
