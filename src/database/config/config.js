require('dotenv').config();

const {
  DEV_DATABASE,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  TEST_DEV_DATABASE,
  TEST_DATABASE_HOST,
  TEST_DATABASE_USER,
  TEST_DATABASE_PORT,
  TEST_DATABASE_PASSWORD

} = process.env;
// const dialectToggle = () =>
//   TEST_GIT_ACTIONS === "true"
//     ? {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       }
//     : {};

module.exports = {
  development: {
    username: DATABASE_USER,
    database: DEV_DATABASE,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,    
    dialect: "postgres",
    logging: false,
    protocol: "postgres",
    

  },
  test: {
    username: TEST_DATABASE_USER,
    database: TEST_DEV_DATABASE,
    password: TEST_DATABASE_PASSWORD,
    host: TEST_DATABASE_HOST,
    port: TEST_DATABASE_PORT,    
    dialect: "postgres",
    logging: false,
    protocol: "postgres",
    
  },
  production: {
    username: DATABASE_USER,
    database: DEV_DATABASE,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,    
    dialect: "postgres",
    logging: false,
    protocol: "postgres",
  }
}