// load environment variables
require('dotenv').config();

const express    = require('express'),
  app            = express(),
  morgan         = require('morgan'),
  bodyParser     = require('body-parser'),
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  flash          = require('connect-flash'),
  session        = require('express-session');

// configure our app ================
// use a session and use flash messages
// app.use(session({ secret: 'blahblahblah' }));   
// app.use(flash());

// grab info from forms
app.use(bodyParser.urlencoded({ extended: true }));

// log requests to the console
app.use(morgan('dev'));

// configure ejs and ejs layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// set place for static assets
app.use(express.static('public/'));

// connect to our database
mongoose.connect(process.env.DB_URL);

// routes ===========================
app.use(require('./app/routes'));

// start the server =================
app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
