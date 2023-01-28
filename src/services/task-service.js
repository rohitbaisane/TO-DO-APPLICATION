const { TaskRepository } = require('../repository/index');

class TaskService {

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getTask(taskId, userId) {
        try {
            const task = await this.taskRepository.getTask(taskId, userId);
            return task;
        }
        catch (err) {
            console.log(err);
            console.log("Something went wrong on service layer");
            throw err;
        }
    }

    async getAllTasks(filter, userId) {
        try {
            const tasks = await this.taskRepository.getAllTasks(filter, userId);
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

    async updateTask(data, taskId, userId) {
        try {
            const updatedTask = await this.taskRepository.updateTask(data, taskId, userId);
            return updatedTask;
        }
        catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

}

module.exports = TaskService