# context-aware-chatbot-29954-29963

## Troubleshooting — Frontend "Invalid Host header"

If the React frontend shows "Invalid Host header" in preview:

- In context-aware-chatbot-29954-29963/chatbot_frontend:
  1. Copy .env.example to .env
  2. Keep:
     - HOST=0.0.0.0
     - PORT=3000
     - DANGEROUSLY_DISABLE_HOST_CHECK=true
- Restart the dev server.

This allows the CRA dev server to accept the preview system's forwarded Host header. Do not use this configuration on public-facing deployments.