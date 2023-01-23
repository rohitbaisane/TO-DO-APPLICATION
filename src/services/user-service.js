const { UserRepository } = require('../repository/index');


class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUser(userId) {
        try {
            const user = await this.userRepository.getUser(userId);
            return user;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }

    }

    async createUser(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }

    }

    async updateUser(userId, data) {
        try {
            const response = await this.userRepository.updateUser(userId, data);
            return response;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await this.userRepository.deleteUser(userId);
            return user;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }

    }

}

module.exports = UserService;