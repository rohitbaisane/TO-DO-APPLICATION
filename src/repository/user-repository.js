const { User } = require('../models/index');
class UserRepository {

    #modifyUserFields(user, data) {
        if (data.name)
            user.name = data.name;
        if (data.email)
            user.email = data.email;
        return user;
    }
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async getUserByEmail(emailId) {
        try {
            const user = await User.findOne({
                where: {
                    email: emailId
                }
            });
            return user;
        }
        catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }

    }

    async updateUser(userId, data) {
        try {
            const user = await User.findByPk(userId);
            const modifiedUser = this.#modifyUserFields(user, data);
            await modifiedUser.save();
            return modifiedUser;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

    async deleteUser(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (err) {
            console.log("Something went wrong on repository layer");
            throw err;
        }
    }

}

module.exports = UserRepository;