const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        duration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        difficulty: {
            type: DataTypes.ENUM('Facil','Moderado','Dificil','Muy Dificil'), 
            allowNull: false
        },
        country: {
          type: DataTypes.STRING,
          allowNull: false
        },
        flag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        continent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
  );
};