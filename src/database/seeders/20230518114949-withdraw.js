'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:(queryInterface, Sequelize) => queryInterface.bulkInsert(
     "withdraws",
     [
      {
        id: 1,
        user_id: 1,
        withdraw_id: 3748728610,
        payout_amount: 50,
        withdraw_status: "pending",
        createdAt: new Date(),
        updatedAt: new  Date()
      },
      {
        id: 2,
        user_id: 2,
        withdraw_id: 3748728611,
        payout_amount: 100,
        withdraw_status: "accepted",
        createdAt: new Date(),
        updatedAt: new  Date()
      },
      {
        id: 3,
        user_id: 3,
        withdraw_id: 3748728612,
        payout_amount: 200,
        withdraw_status: "rejected",
        createdAt: new Date(),
        updatedAt: new  Date()
      },
      {
        id: 4,
        user_id: 4,
        withdraw_id: 3748728613,
        payout_amount: 250,
        withdraw_status: "review",
        createdAt: new Date(),
        updatedAt: new  Date()
      },
     ]
   ,{}),

  down:(queryInterface, Sequelize) => queryInterface.bulkDelete('withdraws',null, {})
};
