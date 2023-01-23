const express = require('express');

const { userController } = require('../../controllers/index');
const { authRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup', authRequestValidators, userController.createUser);
router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.patch('/user/:id', userController.updateUser);


module.exports = router;