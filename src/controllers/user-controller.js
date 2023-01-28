const { UserService } = require('../services/index');

const userService = new UserService();

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched a user',
            data: user,
            err: {}
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: 'Not able to fetch a user',
            data: {},
            err: 'Internal server error'
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body);
        return res.status(201).json({
            succes: true,
            message: 'Sucessfully signed in',
            data: response,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Something went wrong',
            data: {},
            err: err.message
        });
    }

}
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a user',
            data: user,
            err: {}
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Not able to create a user',
            data: {},
            err: err.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully updated a user',
            data: user,
            err: {}
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Not able to create a user',
            data: {},
            err: err.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const response = await userService.deleteUser(req.params.id);
        return res.status(201).json({
            success: true,
            message: 'Successfully deleted a user',
            data: {},
            err: {}
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Not able to delete a user',
            data: {},
            err: err.message
        });
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    createUser,
    signIn
}