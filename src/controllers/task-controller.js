const { TaskService } = require('../services/index');

const taskService = new TaskService();


const getTask = async (req, res) => {
    try {
        const task = await taskService.getTask(req.params.id);
        return res.status(200).json({
            success: true,
            data: task,
            message: 'Successfully fetched a task',
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            messag: 'Can not fetch task',
            err: err.message
        });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const task = await taskService.getAllTasks(req.query);
        return res.status(200).json({
            success: true,
            data: task,
            message: 'Successfully fetched all tasks',
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            messag: 'Can not fetch task',
            err: err.message
        });
    }
}


const createTask = async (req, res) => {

    try {
        const task = await taskService.createTask(req.body);
        return res.status(201).json({
            success: true,
            data: task,
            message: 'Successfully created a task',
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            messag: 'Can not create a task',
            err: err.message
        });
    }

}


const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.body, req.params.id);
        return res.status(201).json({
            success: true,
            data: updatedTask,
            message: 'Successfully updated a task',
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            messag: 'Can not update a task',
            err: err.message
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        const response = await taskService.deleteTask(req.params.id);
        return res.status(201).json({
            success: true,
            data: task,
            message: 'Successfully deleted a task',
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            messag: 'Can not delete a task',
            err: err.message
        });
    }
}

module.exports = {
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
    createTask
};
