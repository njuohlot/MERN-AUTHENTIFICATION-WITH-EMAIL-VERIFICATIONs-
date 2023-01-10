const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();
const db_connect = require('./database/db');
const userRouter = require("./routes/UserRoute.js");
const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
//connect-db
db_connect();
//conneting server
const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log(`Server connected success with port ${port}`);
})