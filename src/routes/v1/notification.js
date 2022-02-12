const express = require('express');
const auth = require('../../middlewares/auth');

const taskController = require('../../controllers/task.controller');
const router = express.Router();

router
.route('/get-notify')
.get( auth(''), taskController.getNotifications)

module.exports = router;