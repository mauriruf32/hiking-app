const { User, HikingPlace, Comment } = require("../db");
const bcrypt  = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt.js");
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET }  = require("../config.js");


// import * as bcrypt from 'bcryptjs';

const register = async (req, res) => {
    const {firstName, lastName, birthDate, phoneNumber, email, password} = req.body;

    try {
// Corroboramos que el usuario no este registrado
        const userFound = await User.findOne({ where: { email } });
        if (userFound) 
            return res.status(400).json([ "This email is already in use" ]);
 
// Crear el usuario
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            birthDate,
            phoneNumber,
            email,
            password: passwordHash,
        });

// Guardar el usuario crado
        const userSaved = await newUser.save();

// Crear token
        const token = await createAccessToken({ id: userSaved.id });
        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            firstName: userSaved.firstName,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const login = (req, res) => res.send("login");
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
// Encontrar el usuario 
        const userFound = await User.findOne({ where: { email } });
        if (!userFound) return res.status(400).json({ message: "User not found" });


        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

       
// Crear token
        const token = await createAccessToken({ id: userFound.id });

        res.cookie('token', token);
        res.json({
            id: userFound.id,
            firstName: userFound.firstName,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};

const logout = async (req, res) => {
        res.cookie('token', "", {
            expires: new Date(0)
         });
         return res.sendStatus(200);
};

const profile = async (req, res) => {
    const userFound = await User.findByPk(req.user.id);

    if(!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        id: userFound.id,
        firstName: userFound.firstName,
        email: userFound.email,
    });
};

const getComments = async (req, res) => {
    const comments = await Comment.findAll();
    res.json(comments);
}

const createComment = async (req, res) => {
    const { description, userId, hikingId } = req.body;
    const comment = new Comment({ description, userId, hikingId });
    const savedComment = await comment.save();
    res.json(savedComment);
}

const getComment = async (req, res) => {
    const { id } = req.params;
   const comment = await Comment.findByPk(id);
   if (!comment) return res.status(404).json({message: "Comment not found"})
   res.json(comment)
};

const hikingPlaceComment = async (req, res) => {
    const {id} = req.params;
    const comments = await Comment.findAll({
        where: {hikingId: id},
    });
    res.json(comments);
 };

const profileHikingPlaces = async (req, res) => {
    const {id} = req.params;
    const hikings = await HikingPlace.findAll({
        where: {userId: id},
    });
    res.json(hikings);
 };

const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findByPk(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({
            id: userFound.id,
            firstName: userFound.firstName,
            email: userFound.email,
        });
    });
};

module.exports = {
    login,
    register,
    logout,
    profile,
    verifyToken,
    profileHikingPlaces,
    getComments,
    createComment,
    hikingPlaceComment,
    getComment,
};