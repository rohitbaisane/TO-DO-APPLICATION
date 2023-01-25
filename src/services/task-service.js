const { TaskRepository } = require('../repository/index');

class TaskService {

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getTask(userId) {
        try {
            const task = await this.taskRepository.getTask(userId);
            return task;
        }
        catch (err) {
            console.log(err);
            console.log("Something went wrong on service layer");
            throw err;
        }
    }

    async getAllTasks(filter) {
        try {
            const tasks = await this.taskRepository.getAllTasks(filter);
            return tasks;
        } catch (err) {
            console.log("Something went wrong on service layer");
            throw err;
        }
    }
    async createTask(data) {
        try {
            const task = await this.taskRepository.createTask(data);
            return task;
        }
        catch (err) {
            console.log("Something went wrong on service layer");
            throw err;
        }
    }

    async updateTask(data, taskId) {
        try {
            const updatedTask = await this.taskRepository.updateTask(data, taskId);
            return updatedTask;
        }
        catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

}

module.exports = TaskService