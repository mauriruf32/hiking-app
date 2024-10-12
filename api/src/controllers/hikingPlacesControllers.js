const { HikingPlace } = require("../db.js");
const { Op } = require('sequelize');


const createHakingPlaceDB = async ( name, image, duration, difficulty, country, flag, continent, lat, lng ) => {

    return await HikingPlace.create({ name, image, duration, difficulty, country, flag, continent, lat, lng });
};

const getHikingPlaceById = async(id) => {

    const userDB = await HikingPlace.findByPk(id);

return userDB;

};

const getAllHikingPlaces = async () => {
    
    return await HikingPlace.findAll();

};

const getHikingPlacebyName = async(name) => {

    const hikingDB = await HikingPlace.findAll({
        where: { name: { [Op.iLike]: `%${name}%` },
        }});

return hikingDB;

    // const userFiltered = await User.filter(user => user.firstName === firstName);
};

module.exports = {
    createHakingPlaceDB,
    getHikingPlaceById,
    getAllHikingPlaces,
    getHikingPlacebyName,
};