#!/bin/bash
git pull origin master
cd ../../frontend/
npm run build --prod
cd ../backend/SNUBot
