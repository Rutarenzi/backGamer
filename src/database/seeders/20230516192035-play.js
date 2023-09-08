'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) =>queryInterface.bulkInsert(
    'plays',
   [ {
      name: "Basketball",
      game: "ishunti",
      createdAt: new Date(),
      updatedAt: new Date(),     
    }
  ],
  {}
   ),
   

   down:(queryInterface, Sequelize) =>queryInterface.bulkDelete("plays",null, {})
 
  
};
