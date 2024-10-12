const { Favorite } = require("../db.js");
const { Op } = require('sequelize');

const postFav = async (req, res) => {
  try {
    const { id, name, duration, difficulty, country, flag, continent } = req.body;

    if (!id || !name || !duration || !difficulty || !country || !continent || !flag)
      return res.status(401).send("Faltan datos");

    /* await Favorite.findOrCreate({
      where: { id, name, origin, status, image, species, gender },
    }); */

    await Favorite.findOrCreate({
      where: { id },
      defaults: { name, duration, difficulty, image, country, continent },
    });

    const favorites = await Favorite.findAll();

    res.json(favorites);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



async function deleteFav(req, res) {
  try {
    const { id } = req.params;

    await Favorite.destroy({ where: { id } });

    const allFavs = await Favorite.findAll();

    return res.status(200).json(allFavs);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}



module.exports = {
    postFav,
    deleteFav
};