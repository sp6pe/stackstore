module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "lHxRn65omoHbUoAfN4xUiHJdQ",
    "consumerSecret": "KBR6algXKZrhJkeFUDLClK8wRrChPOahzCQBTI5QCqpTMSKxmv",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "203749759988101",
    "clientSecret": "5492b0f58f6cbea96208794367dd9648",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "419818733823-i5d0rghhhh1opm6m52vbaqbj2pcl1ont.apps.googleusercontent.com",
    "clientSecret": "-3y2QP3rnUd5WtrA7Nqsw6nO",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};