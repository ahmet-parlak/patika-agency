const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

const pageRoute = require('./routes/pageRoute');
const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');

require('dotenv').config();

//App
const app = express();

//DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connection is successful!`);
  })
  .catch((err) => {
    console.log(`MongoDB connection is failed: ${err}`);
  });

//CONFIGRATION
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy ~ came with express-session

//GLOBAL VARIABLES
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(fileUpload());

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/auth', authRoute);
app.use('/project', projectRoute);

//Listening
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
