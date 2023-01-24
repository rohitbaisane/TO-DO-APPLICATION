const express = require('express');

const { userController } = require('../../controllers/index');
const { taskController } = require('../../controllers/index');

const { authRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup', authRequestValidators, userController.createUser);
router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.patch('/user/:id', userController.updateUser);

router.post('/task', taskController.createTask);
router.get('/task/:id', taskController.getTask);
router.patch('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;