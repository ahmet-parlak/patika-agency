const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

const rootDir = path.dirname(require.main.filename);
const uploadDir = 'public/assets/img/portfolio';
const photoUriPrefix = '/assets/img/portfolio/';

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
    return res.redirect('/#portfolio');
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    create(req.body);
  } else {
    const image = req.files.image ?? null;
    const imageName =
      (Math.random() + 1).toString(36).substring(7) + '_' + image.name;
    const path = `${rootDir}/${uploadDir}/${imageName}`;
    image.mv(path, (err) => {
      if (err) {
        req.flash('error', 'Image failed to upload!');
        return res.redirect('/#portfolio');
      }
      create({ ...req.body, photo: photoUriPrefix + imageName });
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

exports.updateProject = (req, res) => {
  //Validation
  const errors = [];
  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length != 0) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  Project.findById(req.params.id)
    .then((project) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        update(req.body);
      } else {

        //Delete Photo
        if (project.photo) {
          const photoDir = rootDir + '/public' + project.photo;
          if (fs.existsSync(photoDir)) fs.unlinkSync(photoDir);
        }

        //Save new image
        const image = req.files.image ?? null;
        const imageName =
          (Math.random() + 1).toString(36).substring(7) + '_' + image.name;
        const path = `${rootDir}/${uploadDir}/${imageName}`;
        image.mv(path, (err) => {
          if (err) {
            req.flash('error', 'Image failed to upload!');
            return res.redirect('/#portfolio');
          }
          update({ ...req.body, photo: photoUriPrefix + imageName });
        });
      }
    })
    .catch((err) => {
      console.log(err);

      req.flash('error', 'Something is wrong! Please try again');
      return res.redirect('/#portfolio');
    });

  function update(data) {
    Project.findByIdAndUpdate(req.params.id, data)
      .then(() => {
        req.flash('success', 'Project updated!');
        return res.redirect('/#portfolio');
      })
      .catch(() => {
        req.flash('error', 'Something is wrong! Please try again');
        return res.redirect('/#portfolio');
      });
  }
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.photo) {
    const photoDir = rootDir + '/public' + project.photo;
    if (fs.existsSync(photoDir)) fs.unlinkSync(photoDir);
  }

  Project.deleteOne({ _id: project.id })
    .then(() => {
      req.flash(
        'success',
        `Project '${project.title}' removed from portfolio.`
      );

      return res.redirect('/#portfolio');
    })
    .catch((err) => {
      console.log(err);

      req.flash('error', 'Something is wrong! Please try again');
      return res.redirect('/#portfolio');
    });
};
