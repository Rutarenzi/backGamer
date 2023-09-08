'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      commission: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      worknumber: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      P_earning: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      withdraw: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};