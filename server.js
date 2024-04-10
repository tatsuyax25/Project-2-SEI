import express, { json, urlencoded } from 'express';
import { join } from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
// session middleware
import session from 'express-session';
import { initialize, session as _session } from 'passport';
import methodOverride from 'method-override';

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
import './config/database';
// configure Passport
import './config/passport';

// require our routes
import indexRoutes from './routes/index';
import bloggersRoutes from './routes/bloggers';


// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(initialize());
app.use(_session());


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/', bloggersRoutes);


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

export default app;
