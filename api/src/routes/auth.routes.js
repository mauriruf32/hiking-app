const { Router } = require("express");
const { login, register, logout, profile, verifyToken, profileHikingPlaces } = require ("../controllers/auth.controller.js");
const { authRequired } = require("../middlewares/validateToken.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const  { registerSchema, loginSchema } = require( "../auth.schema.js");

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/profile/:id/hikingplaces", authRequired, profileHikingPlaces);

router.get("/verify", verifyToken);


module.exports = router;