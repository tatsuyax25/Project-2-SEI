const express = require('express');
const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser'); // Import cookieParser for parsing cookies
const session = require('express-session'); // Import express-session for managing sessions
const passport = require('passport'); // Import Passport for authentication
const { initialize, session: _session } = require('passport'); // Import initialize and session middleware from Passport
const methodOverride = require('method-override'); // Import methodOverride for HTTP method override

// Load environment variables
require('dotenv').config();

// Create the Express app
const app = express();

// Connect to MongoDB with mongoose
require('./config/database');

// Configure Passport
require('./config/passport');

// Require routes
const indexRoutes = require('./routes/index');
const bloggersRoutes = require('./routes/bloggers');


// View engine setup
app.set('views', join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware setup
app.use(methodOverride('_method')); // Use methodOverride middleware
app.use(express.static(join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(logger('dev')); // Use logger middleware for logging requests
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());// Parse cookies

// mount the session middleware
app.use(
  session({
    secret: "SEI Rocks!", // Secret key for session
    resave: false,
    saveUninitialized: true,
  })
);

// Use Passport in your server setup or routes
app.use(passport.initialize());
app.use(passport.session());

app.use(initialize()); // Initialize Passport
app.use(_session()); // Use Passport session middleware


// Middleware to make user data available in views
app.use(function (req, res, next) {
  res.locals.user = req.user; // Assign the authenticated user to res.locals.user
  next();
});

// Mount routes
app.use('/', indexRoutes); // Mount indexRoutes with base path '/'
app.use('/', bloggersRoutes); // Mount bloggersRoutes with base path '/'


// Handle invalid requests
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
