const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
require("dotenv").config();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_CONNECTION_URL).then(() => console.log('Database Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...'));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

  })
  );

//Logged In Middleware
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}
//Passport Initialized
  app.use(passport.initialize());
  //Setting Up Session
  app.use(passport.session());
  
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });