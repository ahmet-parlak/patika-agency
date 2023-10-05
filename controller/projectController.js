const { validationResult } = require('express-validator');
const path = require('path');
const Project = require('../models/Project');

const rootDir = path.dirname(require.main.filename);

exports.createProject = (req, res) => {
  //Validation
  const errors = [];
  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length != 0) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    create(req.body);
  } else {
    const uploadDir = 'public/assets/img/portfolio';
    const image = req.files.image ?? null;
    const imageName =
      (Math.random() + 1).toString(36).substring(7) + '_' + image.name;
    const path = `${rootDir}/${uploadDir}/${imageName}`;
    image.mv(path, (err) => {
      if (err) {
        req.flash('error', 'Image failed to upload!');
        return res.redirect('/#portfolio');
      }
      create({ ...req.body, photo: '/assets/img/portfolio/' + imageName });
    });
  }

  function create(data) {
    Project.create(data)
      .then(() => {
        req.flash('success', 'Project created!');
        return res.redirect('/#portfolio');
      })
      .catch(() => {
        req.flash('error', 'Something is wrong! Please try again');
        return res.redirect('/#portfolio');
      });
  }
};

exports.updateProject = (req, res) => {};

exports.deleteProject = (req, res) => {};
