require("dotenv").config();
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");
const HikingModel = require("./models/HikingPlace");
const CommentModel = require("./models/Comment");
const LikeModel = require("./models/Like");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);


FavoriteModel(sequelize);
UserModel(sequelize);
HikingModel(sequelize);
CommentModel(sequelize);
LikeModel(sequelize);


const { User, Favorite, HikingPlace, Comment, Like } = sequelize.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

User.hasMany(HikingPlace, {
  foreignKey: 'userId',
  sourceKey: 'id'
});

HikingPlace.belongsTo(User, {
  foreignKey: 'userId',
  targetId: 'id'
});

HikingPlace.hasMany(Comment, {
  foreignKey: "hikingId",
  targetId: "id"
});

Comment.belongsTo(HikingPlace, {
  foreignKey: "hikingId",
  targetId: "id"
});

User.hasMany(Comment, {
  foreignKey: "userId",
  targetId: "id"
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id"
});

HikingPlace.hasMany(Like, {
  foreignKey: "hikingId",
  targetId: "id"
});

Like.belongsTo(HikingPlace, {
  foreignKey: "hikingId",
  targetId: "id"
});

User.hasMany(Like, {
  foreignKey: "userId",
  targetId: "id"
});

Like.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id"
});

module.exports = {
  User,
  Favorite,
  HikingPlace,
  Comment,
  Like,
  conn: sequelize,
};