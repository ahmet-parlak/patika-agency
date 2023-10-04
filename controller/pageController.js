const User = require('../models/User');
const Project = require('../models/Project');

exports.getIndexPage = async (req, res) => {
  const projects = await Project.find().sort('-created_at');

  res.status(200).render('index', { projects });
};

exports.getLoginPage = async (req, res) => {
  const userCount = await User.countDocuments();

  if (userCount) {
    res.status(200).render('login');
  } else {
    res.status(200).render('register');
  }
};
