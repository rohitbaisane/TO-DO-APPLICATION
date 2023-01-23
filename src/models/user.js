'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      validate: {
        isEmail: true
      },
      type: DataTypes.STRING
    },
    password: {
      validate: {
        len: [3, 300]
      },
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return user;
};