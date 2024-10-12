require("dotenv").config();
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");
const HikingModel = require("./models/HikingPlace")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);


FavoriteModel(sequelize);
UserModel(sequelize);
HikingModel(sequelize);


const { User, Favorite, HikingPlace } = sequelize.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
  User,
  Favorite,
  HikingPlace,
  conn: sequelize,
};