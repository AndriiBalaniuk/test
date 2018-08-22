# How to run local
1. Create file local.js in config/webpack && config/app
2. Copy content from local.sample.js to local.js
3. npm install
4. npm start
5. open localhost:3000 or yourIP:3000 in browser

# How to build
local - npm run build:local
dev - npm run build:dev
production - npm run build

# How test build
1. npm run build:yourENV
2. serve -s public
3. open localhost:5000 or yourIP:5000 in browser
