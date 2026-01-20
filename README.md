# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Backend (MongoDB) setup

This repo now includes a small Express API in `server/` that connects to MongoDB Atlas for:
- products (farmer add/edit/delete)
- orders (consumer checkout, farmer order view)

### 1) Configure the API env

- Create `server/.env` (do not commit it)
- Copy keys from `server/env.example` and fill in your values:
  - `MONGODB_URI`: your Atlas URI (with username + password)
  - `DB_NAME`: `capstonProject`
  - `CLIENT_ORIGIN`: `http://localhost:5173`

### 2) Run the API

From `client/server`:

```bash
npm install
npm run dev
```

API health check: `http://localhost:5000/health`

### 3) Run the frontend

From `client`:

```bash
npm run dev
```

### Frontend API config

The frontend reads:
- `VITE_API_URL` (defaults to `http://localhost:5000`)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
