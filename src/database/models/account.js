'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
  
    static associate(models) {
      Account.belongsTo(models.User,{
        foreignKey: "user_id",
        as: "owner",
        onDelete: 'CASCADE'
      });
      Account.belongsTo(models.Level,{
        foreignKey: "level_id",
        as: "level"
      })
    }
  }
  Account.init({
    user_id: DataTypes.INTEGER,
    amount: { type:DataTypes.FLOAT, defaultValue: 0 },
    commission: { type:DataTypes.FLOAT, defaultValue: 0},
    worknumber: DataTypes.INTEGER,
    P_earning: { type:DataTypes.FLOAT, defaultValue: 0 },
    withdraw: { type:DataTypes.FLOAT, defaultValue: 0 },
    level_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};