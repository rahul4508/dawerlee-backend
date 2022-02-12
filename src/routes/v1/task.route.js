const express = require('express');
const auth = require('../../middlewares/auth');

const taskController = require('../../controllers/task.controller');
const router = express.Router();

router
  .route('/create')
  .post( auth(''),  taskController.createTask)
//   .get(auth('getUsers'), userController.getUsers);

router
  .route('/list')
  .get(  auth(''), taskController.getTasks)


  router
  .route('/status/:taskId')
  .patch(  auth(''), taskController.updateStatus)

  router
  .route('/comment/:taskId')
  .patch( auth(''), taskController.createComment)

  module.exports = router;