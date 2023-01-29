const { Task } = require('../models/index');
const { User } = require('../models/index');

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

    #createCustomFilter(filter, userId) {
        let filterObject = { where: {} };
        if (filter.description) {
            filterObject.where = {
                description: {
                    [Op.startsWith]: filter.description
                }
            }
        }
        filterObject.where.userId = userId;
        console.log(filterObject);
        return filterObject;
    }

    async getAllTasks(filter, userId) { //filter can by empty also
        try {
            console.log(userId);
            const filterObject = this.#createCustomFilter(filter, userId);
            const tasks = await Task.findAll(filterObject);
            return tasks;
        }
        catch (err) {
            console.log(err);
            console.log("Something went wrong on repository layer");
            throw err;
        }

    }
    async getTask(taskId, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });
            return task;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async createTask({ description, userId }) {
        try {
            const task = await Task.create({ description, userId });
            return task;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async updateTask({ description, status }, taskId, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });
            if (!task) {
                throw new Error("Did not find taks for corssopnding id");
            }
            const updatedTask = this.#modifyFields(task, { description, status });
            await updatedTask.save();
            return updatedTask;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }

    }

    async deleteTask(taskId, userId) {
        try {
            await Task.destroy({
                where: {
                    id: taskId,
                    userId: userId
                }
            })
            return true;
        }
        catch (err) {
            console.log(err);
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

}

module.exports = TaskRepository;