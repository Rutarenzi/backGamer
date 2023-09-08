'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Level.hasMany(models.Account,{
        foreignKey: "level_id",
        as: "accounts"
      })
    }
  }
  Level.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    minimum: DataTypes.INTEGER,
    commission_rate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};