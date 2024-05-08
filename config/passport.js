const { use, serializeUser, deserializeUser } = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { findOne, findById } = require('../models/user');
const Blogger = require('../models/user').default;
//Require your User Model here!

// configuring Passport!
use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile, "<----Profile")

    findOne({'googleId': profile.id}, function(err, bloggerDoc){

      if(err) return cb(err);

      if(bloggerDoc){

        return cb(null, bloggerDoc)

      } else {

        const newBlogger = new Blogger({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        })

        newBlogger.save(function(err){
          if(err) return cb(err);
          return cb(null, newBlogger)
        });
      }
    });

  }
));

serializeUser(function(blogger, done) {
  done(null, blogger.id);
});

deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  findById(id, function(err, bloggerDoc){
    done(err, bloggerDoc);
  })
});



