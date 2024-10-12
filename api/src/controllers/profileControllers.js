const { User } = require("../db");
const jwt = require('jsonwebtoken'); // Asegúrate de tener instalado `jsonwebtoken`

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtener el token del encabezado

    if (token == null) return res.sendStatus(401); // No autorizado

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // Verificar el token
        if (err) return res.sendStatus(403); // Prohibido
        req.user = user;
        next();
    });
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token
        const user = await User.findByPk(userId); // Encontrar al usuario por ID
        if (!user) return res.status(404).send("Usuario no encontrado");
        res.json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    authenticateToken,
    getUserProfile
};
