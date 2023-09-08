'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:(queryInterface, Sequelize)=> queryInterface.bulkInsert(
    'Deposits',
    [
      {
        id: 1,
        user_id: 1,
        payment_id: 4392892712,
        payment_status: "waiting",
        pay_amount: 250.36992168,
        amount_received: 231.518607,
        order_id: 345673,
        purchase_id: 5856542024,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: 2,
        payment_id: 4392892713,
        payment_status: "sending",
        pay_amount: 260.36992168,
        amount_received: 241.518607,
        order_id: 345674,
        purchase_id: 5856542025,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 3,
        payment_id: 4392892714,
        payment_status: "confirmed",
        pay_amount: 270.36992168,
        amount_received: 251.518607,
        order_id: 345675,
        purchase_id: 5856542026,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 4,
        payment_id: 4392892715,
        payment_status: "failed",
        pay_amount: 280.36992168,
        amount_received: 261.518607,
        order_id: 345676,
        purchase_id: 5856542027,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    ,{}),

  down:(queryInterface, Sequelize)=> queryInterface.bulkDelete('Deposits', null, {})
};
