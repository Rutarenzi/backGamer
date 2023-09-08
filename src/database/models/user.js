const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
       User.hasOne(models.Account,{
        foreignKey: "user_id",
        as: "account",
        onDelete: 'CASCADE'
       });
       User.hasOne(models.genealogy,{
        foreignKey: "user_id",
        as: "referees",
        onDelete: 'CASCADE'
       }),
       User.hasMany(models.Deposit,{
        foreignKey: "user_id",
        as: "deposit",
        onDelete: "CASCADE"
       }),
       User.hasMany(models.withdraw,{
        foreignKey: "user_id",
        as: "withdraw",
        onDelete: 'CASCADE'
       })    
    }
  }
  User.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    token: DataTypes.STRING,
    phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    password:DataTypes.STRING,  
    referrer: DataTypes.STRING,
    referal_code: DataTypes.STRING,
    role: {type:DataTypes.STRING, defaultValue: "normal"},
    profilePic: {
      type:DataTypes.STRING,
      defaultValue:  "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};