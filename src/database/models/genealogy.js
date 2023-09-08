'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genealogy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      genealogy.belongsTo(models.User,{
        foreignKey: "user_id",
        as: "referrer",
        onDelete: "CASCADE"
      });
    }
  }
  genealogy.init({
    user_id: DataTypes.INTEGER,
    inviter: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'genealogy',
  });
  return genealogy;
};