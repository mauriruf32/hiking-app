const { Router } = require("express");
const { authRequired } = require("../middlewares/validateToken.js");
const { 
    createHikingPlace, 
    getHikingPlaces, 
    getHikingPlace, 
    updateHikingPlace, 
    deleteHikingPlace,
} = require("../controllers/hiking.controllers.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const  { createHikingPlaceSchema } = require( "../hiking.schema.js");

const router = Router();

router.get(`/hikingplaces`, getHikingPlaces);

router.get("/hikingplaces/:id", authRequired, getHikingPlace);

router.post("/hikingplaces", authRequired, validateSchema(createHikingPlaceSchema), createHikingPlace);

router.delete("/hikingplaces/:id", authRequired, deleteHikingPlace);

router.put(`/hikingplaces/:id`, authRequired, updateHikingPlace);

module.exports = router;