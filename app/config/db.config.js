module.exports = {
  HOST: "127.0.0.1",
  USER: "proot",
  PASSWORD: "!@3Billion",
  DB: "oblist_b2b",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
