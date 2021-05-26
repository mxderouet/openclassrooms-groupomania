'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING, 
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      isEmail: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};