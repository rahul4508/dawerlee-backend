const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const taskRoute = require('./task.route');
const notifyRoute = require('./notification');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const taskType = require('./taskType.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
  {
  path: '/notification',
  route: notifyRoute,
  },
  {
    path: '/task-type',
    route: taskType,
    },

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
