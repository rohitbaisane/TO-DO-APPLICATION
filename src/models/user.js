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
      this.hasMany(models.Task, {
        foreignKey: 'userId'
      });
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
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
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