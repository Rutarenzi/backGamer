'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class play extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  play.init({
    name: DataTypes.STRING,
    game: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'play',
  });
  return play;
};