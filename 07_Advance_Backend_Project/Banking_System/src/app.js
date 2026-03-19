require('dotenv').config()
const cookieParser = require("cookie-parser")
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const app = express();

app.use(express.json()) //middleware which enables to read data of req.body
app.use(cookieParser())
app.use("/api/auth",authRoutes)
module.express = app;
