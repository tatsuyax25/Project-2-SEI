const express = require('express');
const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser'); // Import cookieParser for parsing cookies
const session = require('express-session'); // Import express-session for managing sessions
const passport = require('passport'); // Import Passport for authentication
const methodOverride = require('method-override'); // Import methodOverride for HTTP method override
const { join } = require('path'); // Import join from path
const logger = require('morgan'); // Import logger middleware

// Load environment variables
require('dotenv').config();

// If using a local .env file, uncomment the line below
//  and ensure you have the .env.local file set up correctly
require("dotenv").config({ path: ".env.local" });


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

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

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
    secret: process.env.SESSION_SECRET || "SEI Rocks!",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      httpOnly: true, // Prevent XSS attacks
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Use Passport in your server setup or routes
app.use(passport.initialize());
app.use(passport.session());


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

// If running directly, start the server (for local dev or platforms like Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;