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
