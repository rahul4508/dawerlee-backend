const express = require('express');
const auth = require('../../middlewares/auth');

const taskController = require('../../controllers/task.controller');
const router = express.Router();

router
  .route('/create')
  .post(  taskController.createTask)
//   .get(auth('getUsers'), userController.getUsers);

router
  .route('/list')
  .get(  taskController.getTasks)

  module.exports = router;