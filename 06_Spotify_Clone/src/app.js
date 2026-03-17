const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes");
const musicRoutes = require("../src/routes/music.routes");
//middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

module.exports = app;   
