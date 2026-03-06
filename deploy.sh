#!/bin/bash

echo "🚀 Starting Deployment for Myint Myint Cho..."

# 1. Pull latest code from GitHub
git pull origin main

# 2. Install dependencies
pnpm install

# 3. Build the project (Vite + Esbuild)
pnpm run build

# 4. Restart the application with PM2
pm2 restart mmc-website

# chmod +x deploy.sh [ Give the permission to run on VPS ]
# ./deploy.sh [ Run on Server ]

echo "✅ Deployment Complete! Website is live at https://myintmyintcho.shop"