# Chatbot Frontend — Ocean Professional

Modern, responsive React UI for a context-aware chatbot with RAG + MCP.

## Features

- Sidebar navigation with recent chats
- Main chat panel with user/assistant bubbles
- Input composer at bottom with Enter-to-send
- REST API integration:
  - GET `/api/chat/history`
  - POST `/api/chat/send` (body: `{ "message": "..." }`)
- Ocean Professional theme (blue + amber accents), rounded corners, gradients, subtle shadows
- Responsive layout and accessible roles/labels

## Getting Started

Install dependencies:
```bash
npm install
```

Run the app:
```bash
npm start
```

Build for production:
```bash
npm run build
```

### Fixing "Invalid Host header" in preview

When running in a preview/proxy environment, Create React App's development server may block requests with an "Invalid Host header" because the forwarded Host does not match localhost. To allow the preview host:

1) Copy the provided environment example:
```bash
cp .env.example .env
```

2) Ensure these settings are present in `.env`:
```
HOST=0.0.0.0
PORT=3000
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

- HOST=0.0.0.0 lets the dev server accept connections from the preview proxy.
- DANGEROUSLY_DISABLE_HOST_CHECK=true disables the host header validation used by webpack-dev-server in development so the preview domain is accepted.

These settings are intended for local/CI preview use only and should not be used for public internet exposure.

If you still encounter issues:
- The preview runner might ignore `.env`. Use the built-in start script which enforces these variables via `cross-env`:
  ```bash
  npm start
  ```
  This runs:
  ```
  cross-env HOST=0.0.0.0 PORT=3000 DANGEROUSLY_DISABLE_HOST_CHECK=true react-scripts start
  ```
  ensuring the variables are applied even if `.env` isn't loaded by the runner.

- Confirm port: the preview URL must proxy to the same port as `PORT` (default 3000).

- Verify dev server picks up runtime files: you should see `[setupProxy] Loaded.` logs in the terminal when the dev server starts. If you don't see them, the dev server may not be starting from this folder.

- As a last resort (not recommended), ejecting would allow customizing `webpackDevServer.config.js` to set `allowedHosts: 'all'`. Prefer to avoid `npm run eject`.

## Configuration

Environment variables (create `.env` in this folder or set in environment):

- `REACT_APP_API_BASE_URL` — Optional. Base URL of backend. Defaults to same origin.

Example `.env`:
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Development proxy (important)

This project uses Create React App’s development proxy to forward API calls during local development. The `package.json` includes:
```json
"proxy": "http://localhost:8000"
```
With this, requests to relative paths like `/api/chat/send` will be proxied to your backend server on port 8000, avoiding the “Cannot POST /api/chat/send” error from the CRA dev server.

Use one of the following setups:
- Preferred: Start your backend at `http://localhost:8000` and keep `REACT_APP_API_BASE_URL` unset. The proxy will forward `/api/**` requests.
- Alternative: Set `REACT_APP_API_BASE_URL` to your backend URL (e.g., `http://localhost:8000`). The app will call the backend directly, bypassing the proxy.

If you deploy the frontend separately from the backend, set `REACT_APP_API_BASE_URL` to the deployed backend URL.

You can find an example environment file at `.env.example`.

## Project Structure

- `src/theme.js` — Ocean Professional design tokens
- `src/services/api.js` — REST client helpers
- `src/components/Sidebar.js` — Sidebar and history
- `src/components/ChatWindow.js` — Messages and composer
- `src/components/Layout.js` — App shell and responsive container
- `src/App.js` — App state management and integration

## Notes

- The UI gracefully falls back to a local "New chat" session if history is unavailable.
- No external UI libraries are used to keep bundle minimal.
- All network errors surface as a non-blocking banner above the composer.
