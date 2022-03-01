const express = require('express');
const auth = require('../../middlewares/auth');

const taskController = require('../../controllers/taskType.controller');
const router = express.Router();

router
  .route('/create')
  .post( auth(''),  taskController.createType)
//   .get(auth('getUsers'), userController.getUsers);

router
  .route('/list')
  .get(  auth(''), taskController.list)

  router
  .route('/delete')
  .delete(  auth(''), taskController.deleteType)


  
  module.exports = router;