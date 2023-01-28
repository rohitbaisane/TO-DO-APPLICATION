const { UserRepository } = require('../repository/index');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/serverConfig');
class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    generateJwtToken(userId) {
        try {
            const jwtToken = jwt.sign({ id: userId }, jwtKey, { expiresIn: "1d" });
            return jwtToken;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }

    }
    async getUserById(userId) {
        try {
            const user = await this.userRepository.getUserById(userId);
            return user;
        }
        catch (err) {
            console.log('Something went wrong on service layer');
            throw err;
        }

    }

    async signIn({ email, password }) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user)
                throw new Error('Wrong email address');
            if (!(password == user.password))
                throw new Error('Wrong password');
            const jwtToken = this.generateJwtToken(user.id);
            return jwtToken;
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