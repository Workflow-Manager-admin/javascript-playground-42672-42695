#!/bin/bash
cd /home/kavia/workspace/code-generation/javascript-playground-42672-42695/javascript_playground_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

