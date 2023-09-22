const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");
const cors = require('cors');

const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");

const app = express();
app.use(cors());
// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter);

app.get('/top-ten-games', async (req, res) => {
  try {
      const API_TOKEN = 'YOUR_STEAM_API_TOKEN';
      const response = await fetch('https://themealdb.com/api/json/v1/1/random.php');
      
      if (!response.ok) {
          throw new Error('Failed to fetch from Steam API');
      }
      const gameData = await response.json(); 
      res.json(gameData);
  } catch (error) {
      console.error('Error fetching top ten games:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});





module.exports = app;
