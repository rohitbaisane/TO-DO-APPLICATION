const { Task } = require('../models/index');
const { Op } = require('sequelize');
class TaskRepository {

    #modifyFields(task, givenTask) {

        if (givenTask.description) {
            task.description = givenTask.description;
        }
        if (givenTask.status) {
            task.status = givenTask.status;
        }
        return task;
    }

    async getAllTasks(filter) { //filter can by empty also

        try {
            if (filter.description) {
                const tasks = await Task.findAll({
                    where: {
                        description: {
                            [Op.startsWith]: filter.description
                        }
                    }
                });
                return tasks;
            }
            const tasks = await Task.findAll();
            return tasks;
        }
        catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }

    }
    async getTask(taskId) {

        try {
            const task = await Task.findByPk(taskId);
            return task;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async createTask({ description, userId }) {
        try {
            const task = await Task.create({
                description,
                userId
            });
            return task;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async updateTask({ description, status }, taskId) {
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                throw new Error("Did not find taks for corssopnding id");
            }
            console.log(task);
            const updatedTask = this.#modifyFields(task, { description, status });
            console.log(updatedTask);
            await updatedTask.save();
            return updatedTask;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }

    }

    async deleteTask(userId) {
        try {
            await Task.destroy({
                where: userId
            });
            return true;
        }
        catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

}

module.exports = TaskRepository;