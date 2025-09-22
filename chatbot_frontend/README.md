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
