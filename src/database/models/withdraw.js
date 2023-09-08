'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class withdraw extends Model {
   
    static associate(models) {
      withdraw.belongsTo(models.User,{
        foreignKey: "user_id",
        as: "withdrawer",
        onDelete: "CASCADE"
      })
    }
  }
  withdraw.init({
    user_id: DataTypes.INTEGER,
    withdraw_id: DataTypes.BIGINT,
    payout_amount: DataTypes.FLOAT,
    withdraw_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'withdraw',
  });
  return withdraw;
};