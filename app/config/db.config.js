module.exports = {
  HOST: process.env.DB_HOST,     // Database host (PostgreSQL)
  USER: process.env.DB_USER,     // Database username
  PASSWORD: process.env.DB_PASSWORD, // Database password
  DB: process.env.DB_NAME,       // Database name
  dialect: "postgres",           // Change to 'postgres' for PostgreSQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
// module.exports = {
//   HOST: '127.0.0.1',     // Database host (PostgreSQL)
//   PORT: "5432",
//   USER: 'postgres',     // Database username
//   PASSWORD: '!@3Billion', // Database password
//   DB: 'oblist_b2b',       // Database name
//   dialect: "postgres",           // Change to 'postgres' for PostgreSQL
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
