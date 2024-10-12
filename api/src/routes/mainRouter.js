const { Router } = require("express");
const usersRouter = require("./usersRouter");
// const hikingRouter = require("./hikingRouter");
const favsRouter = require("./favRouter");
// const loginRouter = require("../controllers/auth.controller.js");
// const profileRouter = require("./profileRouter")


const mainRouter = Router();

mainRouter.use("/users", usersRouter);

// mainRouter.use("/hikingplaces", hikingRouter);

mainRouter.use("/favorites", favsRouter);

// mainRouter.use("/login", loginRouter);

// mainRouter.use("/profile", profileRouter);

module.exports = mainRouter;