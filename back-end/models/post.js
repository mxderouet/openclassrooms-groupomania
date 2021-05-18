'use strict';
const User = require("../models").User;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = models.Post.belongsTo(models.User);
    }
  };
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: DataTypes.STRING,
    image: DataTypes.STRING,
    post_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  // Post.belongsTo(models.User);
  return Post;
};