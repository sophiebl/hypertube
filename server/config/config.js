module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: "hypertube_dev",
    host: "127.0.0.1",
    dialect: "postgres"
    // operatorsAliases: false
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: null,
    database: "hypertube_test",
    host: "127.0.0.1",
    dialect: "postgres"
    // operatorsAliases: false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: null,
    database: "hypertube_production",
    host: "127.0.0.1",
    dialect: "postgres"
    // operatorsAliases: false
  }
};
