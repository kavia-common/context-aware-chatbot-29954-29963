#!/bin/bash
cd /home/kavia/workspace/code-generation/context-aware-chatbot-29954-29963/chatbot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

