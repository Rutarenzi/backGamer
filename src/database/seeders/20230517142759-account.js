'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:(queryInterface, Sequelize)=>queryInterface.bulkInsert(
    'Accounts',
    [
      {
        id: 12,
        user_id: 1,
        amount: 100,
        commission: 0,
        worknumber: 50,
        P_earning:34,
        withdraw: 50,
        level_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        amount: 200,
        commission: 0,
        worknumber: 50,
        P_earning:68,
        withdraw: 100,
        level_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 3,
        amount: 300,
        commission: 0,
        worknumber: 50,
        P_earning:102,
        withdraw: 20,
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_id: 4,
        amount: 400,
        commission: 0,
        worknumber: 50,
        P_earning:136,
        withdraw: 0,
        level_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accounts',null,{}) 
};
