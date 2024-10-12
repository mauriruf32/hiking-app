require("dotenv").config();


const server = require("./src/app");

const {conn} = require("./src/db");


const PORT = process.env.PORT || 3001;



server.listen(3001, () => {
    conn.sync({force: false});
    console.log(`Listening on port ${3001}`);
});

