'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deposit extends Model {
    static associate(models) {
      Deposit.belongsTo(models.User,{
        foreignKey: "user_id",
        as: "payee",
        onDelete: "CASCADE"
      })
    }
  }
  Deposit.init({
    user_id: DataTypes.INTEGER,
    payment_id: DataTypes.BIGINT,
    payment_status: DataTypes.STRING,
    pay_amount: DataTypes.FLOAT,
    amount_received: DataTypes.FLOAT,
    order_id: DataTypes.BIGINT,
    purchase_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Deposit',
  });
  return Deposit;
};