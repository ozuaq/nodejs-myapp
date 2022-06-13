const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::my-app.db:');
// Create a new user
const jane = User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);