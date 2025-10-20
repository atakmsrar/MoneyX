#!/bin/bash

# Build the project
npm run build

# Deploy to GitHub Pages using gh-pages
npx gh-pages -d dist

echo "Deployment completed!"
