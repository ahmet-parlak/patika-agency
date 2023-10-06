const express = require('express');
const projectController = require('../controller/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const projectValidator = require('../middlewares/validations/project');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  projectValidator,
  projectController.createProject
);
router.put(
  '/:id',
  authMiddleware,
  projectValidator,
  projectController.updateProject
);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
