const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
      timestamps: false,
    }
  );
}