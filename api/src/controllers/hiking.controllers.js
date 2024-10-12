const { HikingPlace } = require("../db");

const getHikingPlaces = async (req, res) => {
    const hikingPlaces = await HikingPlace.find();
    res.json(hikingPlaces);
};

const createHikingPlace = async (req, res) => {
    const { name, image, duration, difficulty, country, flag, continent, lat, lng } = req.body;
    const newHikingPlace = new HikingPlace({ name, image, duration, difficulty, country, flag, continent, lat, lng });
    const savedHikingPlace = await newHikingPlace.save();
    res.json(savedHikingPlace);

};

const getHikingPlace = async (req, res) => {
   const hikingPlace = await HikingPlace.findByPk(req.params.id);
   if (!hikingPlace) return res.status(404).json({message: "Hiking Place not found"})
   res.json(hikingPlace)
};

const deleteHikingPlace = async (req, res) => {
    const hikingPlace = await HikingPlace.destroy(req.params.id);
    if (!hikingPlace) return res.status(404).json({message: "Hiking Place not found"})
    res.json(hikingPlace)
};

const updateHikingPlace = async (req, res) => {
    const hikingPlace = await HikingPlace.update(req.params.id, req.body, {
        new: true,
    });
    if (!hikingPlace) return res.status(404).json({message: "Hiking Place not found"})
    res.json(hikingPlace)
};

module.exports = {
    getHikingPlaces,
    getHikingPlace,
    createHikingPlace,
    updateHikingPlace,
    deleteHikingPlace,
};