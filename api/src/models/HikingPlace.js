const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('HikingPlace', {
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
            allowNull: true,
        },
        difficulty: {
            type: DataTypes.ENUM('Facil', 'Moderado', 'Dificil', 'Muy Dificil'),
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT, // Cambiado a FLOAT para latitud
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT, // Cambiado a FLOAT para longitud
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        continent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};
