const { User } = require("../db");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // Cambiar a req.body

    if (!email || !password) return res.status(400).send("Faltan datos");

    console.log(email, password);

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).send("Usuario no encontrado");

    return user.password === password
      ? res.status(200).json({ access: true })
      : res.status(403).send("Contraseña incorrecta");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  postLogin
};


// const { User } = require("../db");
// const bcrypt = require("bcrypt");

// const postLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body; // Cambiar a req.body

//     if (!email || !password) return res.status(400).send("Faltan datos");

//     console.log(email, password);

//     const user = await User.findOne({ where: { email } });

//     if (!user) return res.status(404).send("Usuario no encontrado");

//     // Verificar la contraseña
//     const isMatch = await bcrypt.compare(password, user.password);

//     return isMatch
//       ? res.status(200).json({ jwt: "fake-jwt-token" }) // En un caso real, genera y devuelve un JWT real
//       : res.status(403).send("Contraseña incorrecta");
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// module.exports = {
//   postLogin
// };

// const { User } = require("../db");

// const postLogin = async (req, res) => {
//   try {
//     const { email, password } = req.query;

//     if (!email || !password) return res.status(400).send("Faltan datossss");
//     console.log(email, password);

//     const user = await User.findOne({ where: { email } });

//     if (!user) return res.status(404).send("Usuario nNO encontrado");

//     /* if (user.password === password)
//       return res.status(200).json({ access: true });

//       return res.status(403).send("Contraseña incorrecta"); */

//     return user.password === password
//       ? res.status(200).json({ access: true })
//       : res.status(403).send("Contraseña incorrecta");
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// module.exports = {
//   postLogin
// };