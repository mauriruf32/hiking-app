const { Router } = require("express");

const { postFav, deleteFav } = require("../controllers/favoritesControllers");

const favsRouter = Router();


favsRouter.delete("/:id", deleteFav);

favsRouter.post("/", postFav);

// usersRouter.put("/edit/:id", PutUser);

module.exports = favsRouter;