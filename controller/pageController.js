const User = require('../models/User');

exports.getIndexPage = (req, res) => {
  res.status(200).render('index');
};

exports.getLoginPage = async (req, res) => {
  const userCount = await User.countDocuments();
  
  if (userCount) {
    res.status(200).render('login');
  } else {
    res.status(200).render('register');
  }
};
