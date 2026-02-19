# Blockchain System

A full-stack blockchain demo application with a modern frontend and a Spring Boot backend (Java 21 LTS).

## Project Overview

This project demonstrates core blockchain-style workflows in a simple and practical way:

- Create and view transactions
- Create blocks
- Track block chain history
- Show dashboard metrics (blocks, transactions, pending)

The frontend works in two modes:

1. **API mode** (when backend is available)
2. **Demo mode** (local in-browser fallback if backend is not reachable)

### Live Links

- Frontend Live: https://shravannikalje.github.io/Blockchain-System-/
- Backend Live (Render): https://chainsys-backend.onrender.com/api/health

---

## Tech Stack

### Frontend

- HTML5 (`INDEX.HTML`)
- CSS3 (`css/style.css`)
- Vanilla JavaScript (`js/script.js`, `js/config.js`)

### Backend

- Java 21 (LTS)
- Spring Boot 3.4.2
- Maven
- REST APIs

### Deployment

- Backend: Render (`backend/render.yaml`, `backend/Dockerfile`)
- Frontend: Static hosting / GitHub Pages ready

---

## Repository Structure

```text
.
├── INDEX.HTML
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── script.js
├── assets/
│   └── images/
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── render.yaml
│   └── src/main/java/com/chainsysvr/backend/
│       ├── BlockchainBackendApplication.java
│       ├── controller/BlockchainController.java
│       ├── model/Block.java
│       ├── model/Transaction.java
│       └── service/BlockchainService.java
└── README.md
```

---

## Frontend Details

### `INDEX.HTML`

- Dashboard layout with sections:
  - Hero + metrics
  - Recent transactions table
  - Create block form
  - Chain preview

### `css/style.css`

- Modern dark UI theme
- Responsive layout for mobile/tablet/desktop
- Styled cards, table, form, metrics, and toast notifications

### `js/config.js`

- Backend base URL configuration
- Set `API_BASE_URL` in production:

```js
window.APP_CONFIG = {
  API_BASE_URL: "https://your-backend-url/api",
};
```

### `js/script.js`

- API integration via `fetch`
- Renders transactions and blocks dynamically
- Shows toast notifications
- Falls back to demo mode if backend is unavailable

---

## Backend Details

### Java Runtime Upgrade

Backend runtime is upgraded from **Java 17** to **Java 21 LTS** in:

- `backend/pom.xml` (`<java.version>21</java.version>`)

### Main API Controller

`backend/src/main/java/com/chainsysvr/backend/controller/BlockchainController.java`

Available endpoints:

- `GET /api/transactions` → List transactions
- `POST /api/transactions` → Create transaction
- `GET /api/blocks` → List blocks
- `POST /api/blocks` → Create block
- `GET /api/health` → Health status

### Service Logic

`backend/src/main/java/com/chainsysvr/backend/service/BlockchainService.java`

- Keeps in-memory lists for transactions and blocks
- Creates genesis block on startup
- Normalizes transaction status (`Confirmed` / `Pending`)
- Generates pseudo hashes for blocks

### Models

- `model/Transaction.java`
- `model/Block.java`

Both include Jakarta validation annotations (`@NotBlank`, `@Positive`, `@NotNull`).

---

## Local Run Guide

### Backend (Spring Boot)

From `backend/`:

- Build: `mvn clean package`
- Run: `mvn spring-boot:run`

Backend runs on: `http://localhost:8080`

### Frontend

Open `INDEX.HTML` directly in browser.

For API mode, set backend URL in `js/config.js`.

---

## Deployment Notes

### Backend on Render

`backend/render.yaml` is configured as:

- Web service name: `chainsys-backend`
- Docker deploy using `Dockerfile`
- Health check: `/api/health`

### Frontend

Can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting platform

---

## What We Completed (Final Summary)

- Created/published full-stack repository
- Added frontend files (HTML/CSS/JS)
- Added backend Spring Boot Java files
- Upgraded backend runtime to **Java 21 LTS**
- Verified build and tests during upgrade workflow
- Configured repository for deployment readiness
- Added final project documentation (this README)

---

## GitHub Repository

`https://github.com/shravannikalje/Blockchain-System-`

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

If you want, next we can add:

- API request examples (Postman/cURL)
- screenshots section
- architecture diagram
- contributor section
