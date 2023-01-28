const UserService = require('../services/user-service');

const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/serverConfig');
const validateUserAuth = (req, res, next) => {

    //check for mandatory fields like email and password

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Cannot validate user',
            error: 'Missing mandatory parameters in req body'
        });
    }

    //remove unncessary fields from req.body

    const allowedFields = ['name', 'email', 'password'];
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys; i++) {
        if (!allowedFields.includes(keys[i]))
            delete req.body[keys[i]];
    }
    next();
}

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw { message: 'Token is missing' };
        }
        const response = jwt.verify(token, jwtKey);
        if (!response) {
            throw { message: 'Invalid token' };
        }
        const userService = new UserService();
        const user = await userService.getUserById(response.id);
        if (!user)
            throw { message: 'No user exists with corrosponding token' };
        req.user = user;
        console.log(req.user);
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            data: {},
            err: err.message,
            message: 'Not able to authenticate user',
        })
    }
}
module.exports = { validateUserAuth, authenticateUser }
