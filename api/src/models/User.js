const { DataTypes } = require('sequelize');
// const {sequelize} = require("../db.js");

// const { HikingPlace } = require("./HikingPlace.js");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // To ensure each email is unique
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        allowNull: true,
      },

    },
    {
      timestamps: false,
    }
  );
}

