const { Router } = require("express");

const { getUserProfile } = require("../controllers/profileControllers");

const profileRouter = Router();



profileRouter.get("/", getUserProfile);

module.exports = profileRouter;