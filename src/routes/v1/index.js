const express = require('express');

const { userController } = require('../../controllers/index');
const { taskController } = require('../../controllers/index');

const { userRequest } = require('../../middlewares/index');
const { validateTask } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup', userRequest.validateUserAuth, userController.createUser);
router.get('/user/:id', userRequest.authenticateUser, userController.getUser);
router.delete('/user/:id', userRequest.authenticateUser, userController.deleteUser);
router.patch('/user/:id', userRequest.authenticateUser, userController.updateUser);
router.post('/signin', userController.signIn);

router.post('/task', validateTask, userRequest.authenticateUser, taskController.createTask);
router.get('/task/:id', userRequest.authenticateUser, taskController.getTask);
router.patch('/task/:id', userRequest.authenticateUser, taskController.updateTask);
router.delete('/task/:id', userRequest.authenticateUser, taskController.deleteTask);
router.get('/task', userRequest.authenticateUser, taskController.getAllTasks);
module.exports = router;