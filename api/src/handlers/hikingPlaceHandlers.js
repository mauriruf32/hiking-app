const { createHakingPlaceDB, getHikingPlaceById, getAllHikingPlaces, getHikingPlacebyName } = require("../controllers/hikingPlacesControllers");

const getHikingPlacesHandler = async (req, res) => {
    const { name } = req.query;

    try {
    if(name) {
        const hikingPlaceByName = await getHikingPlacebyName(name);
        res.status(200).json(hikingPlaceByName);
    } else {
        const response = await getAllHikingPlaces();
        res.status(200).json(response);
    }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getHikingPlaceByIdHandler = async (req, res) => {
    const { id } = req.params;


try {
    const response = await getHikingPlaceById(id);
    res.status(200).json(response);
} catch (error) {
    res.status(400).json({error: error.message});
}

};

const createHikingPlaceHandler = async (req, res) => {
    const { name, image, duration, difficulty, country, flag, continent, lat, lng } = req.body;

    try {
        const response = await createHakingPlaceDB(name, image, duration, difficulty, country, flag, continent, lat, lng );
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});
    }

    // res.status(200).send(`Usuario ${firstName} creado con el email ${email}`);
};


// /:id => params
// query ===> ?name=name&raza=raza
// body ===> infop


module.exports = {
    getHikingPlaceByIdHandler,
    getHikingPlacesHandler,
    createHikingPlaceHandler,
};