const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const db = require('../config/db.config.js');

const config = require('./keys.js');
//const User = require('../models/user');
const User = db.users;

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
passport.use('googleToken',new GooglePlusTokenStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ "googleId": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
else{
    const newUser = new User({
      //method: 'google',
        googleId: profile.id,
        googleEmail: profile.emails[0].value,
    
    });

    await newUser.save();
    done(null, newUser);
}
  } catch(error) {
    done(error, false, error.message);
  }
}));

///////////////////
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
     const existingUser = await User.findOne({ where: {
            facebookId: profile.id 
        }});
    if (existingUser) {
      return done(null, existingUser);
    } 
       else{
     const newUser = {
       facebookId:profile.id,
        first_name : profile.name['givenName'],
        last_name : profile.name['familyName'],
        email : profile.emails[0]['value'],
        
    }

    await User.create(newUser);
    done(null, newUser);
}
  } catch(error) {
    done(error, false, error.message);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });
    
    // If not, handle it
    if (!user) {
      return done(null, false);
    }
  
    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);
  
    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }
  
    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));