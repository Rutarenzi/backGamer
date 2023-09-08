'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:(queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Levels",
    [
      {
          id: 1,
          name: "Vip-1",
          image: "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
          minimum: 50,
          commission_rate: "5",
          createdAt: new Date(),
          updatedAt: new Date()

      },
      {
        id: 2,
        name: "Vip-2",
        image: "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
        minimum: 100,
        commission_rate: "5",
        createdAt: new Date(),
        updatedAt: new Date()

    },
    {
      id: 3,
      name: "Vip-3",
      image: "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
      minimum: 300,
      commission_rate: "7",
      createdAt: new Date(),
      updatedAt: new Date()

  },
  {
    id: 4,
    name: "Vip-1",
    image: "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
    minimum: 800,
    commission_rate: "10",
    createdAt: new Date(),
    updatedAt: new Date()

}
    ],
   {}) ,

  down:(queryInterface, Sequelize) => queryInterface.bulkDelete("Levels", null, {})
  }