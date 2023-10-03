const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const pageRoute = require('./routes/pageRoute');

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

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/', pageRoute);

//Listening
const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
