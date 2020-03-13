const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("hypertube", "sboulaao", "", {
  host: "localhost",
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
export default sequelize;
