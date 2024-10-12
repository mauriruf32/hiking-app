const { Router } = require("express");

const { getHikingPlacesHandler, createHikingPlaceHandler, getHikingPlaceByIdHandler } = require("../handlers/hikingPlaceHandlers");


const hikingRouter = Router();

hikingRouter.get("/", getHikingPlacesHandler);

hikingRouter.get("/:id", getHikingPlaceByIdHandler);

hikingRouter.post("/", createHikingPlaceHandler);

// usersRouter.put("/edit/:id", PutUser);


module.exports = hikingRouter;