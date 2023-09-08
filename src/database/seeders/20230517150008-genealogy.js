'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:(queryInterface, Sequelize) => queryInterface.bulkInsert(
    "genealogies",
    [
      {
        id: 12,
        user_id: 1,
        inviter: [1],
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id: 2,
        inviter: [1],
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id: 3,
        inviter: [1,2],
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id: 4,
        inviter: [1,2,3],
        createdAt:new Date(),
        updatedAt: new Date()
      },
    ],
  {}),
  down:(queryInterface, Sequelize) =>queryInterface.bulkDelete("genealogies", null, {})
}
