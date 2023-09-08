'use strict';
// const BcryptUtils  = require("../../utils/brcypt");
require("dotenv/config");
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:(queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Users',
      [
       {
        id: 2,
        username: "christiano12",
        fullname: "christiano ronaldo",
        phone: "+26465286428",
        whatsapp:"+2323223232",
        password: "default",
        referrer: "grx250",
        role: "normal",
        referal_code: "gft250",
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 5,
        username: "messi12",
        fullname: "lionel messi",
        phone: "+26465286428",
        whatsapp:"+2323223232",
        password: "default1",
        referrer: "gft250",
        referal_code: "gft251",
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 3,
        username: "mbape12",
        fullname: "kilian  mbape",
        phone: "+26465286428",
        whatsapp:"+2323223232",
        password: "default1",
        referrer: "gft251",
        referal_code: "gft252",
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 4,
        username: "haruna12",
        fullname: "Haruna niyonzima",
        phone: "+26465286428",
        whatsapp:"+2323223232",
        password: BcryptUtils.hash("default1"),
        referrer: "gft252",
        referal_code: "gft253",
        createdAt: new Date(),
        updatedAt: new Date()
       }
    ],
      {}
  ),
   down:(queryInterface, Sequelize)=>queryInterface.bulkDelete('Users', null, {}) 
  

};
