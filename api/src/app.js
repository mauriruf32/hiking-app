const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const mainRouter = require("./routes/mainRouter");
const authRoutes = require ("./routes/auth.routes.js");
const hikingRoutes = require ("./routes/hiking.routes.js");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())


app.use("/api", authRoutes);
app.use("/api", hikingRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})


// app.use(mainRouter);



module.exports = app;