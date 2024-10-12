const { Router } = require("express");

const { postLogin } = require("../controllers/PostLogin.js");

const loginRouter = Router();



loginRouter.post("/", postLogin);

module.exports = loginRouter;