const { where } = require("sequelize");
const { HikingPlace } = require("../db");

const getHikingPlaces = async (req, res) => {
    const hikingPlaces = await HikingPlace.findAll();
    res.json(hikingPlaces);
};

const createHikingPlace = async (req, res) => {
    const { name, image, duration, difficulty, country, flag, continent, lat, lng, userId } = req.body;
    const newHikingPlace = new HikingPlace({ name, image, duration, difficulty, country, flag, continent, lat, lng, userId });
    const savedHikingPlace = await newHikingPlace.save();
    res.json(savedHikingPlace);

};

// const getHikingPlace = async (req, res) => {
//     try {
//         const id = req.params.id; // Asegúrate de que este es el ID correcto
//         console.log('ID passed to findByPk:', id); // Agrega este log
//         const hikingPlace = await HikingPlace.findByPk(id);
//         if (!hikingPlace) {
//             return res.status(404).json({ message: 'Hiking place not found' });
//         }
//         res.json(hikingPlace);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


const getHikingPlace = async (req, res) => {
    const { id } = req.params;
   const hikingPlace = await HikingPlace.findByPk(id);
   if (!hikingPlace) return res.status(404).json({message: "Hiking Place not found"})
   res.json(hikingPlace)
};

const deleteHikingPlace = async (req, res) => {
    const { id } = req.params;
    const hikingPlace = await HikingPlace.destroy({where:{ id:id },});
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