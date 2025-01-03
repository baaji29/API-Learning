import express from "express";
import router from "./Router/index.mjs";
import dotenv from 'dotenv';
import { dbConnect } from "./Config/config.mjs";
dotenv.config();

dbConnect();

const PORT = process.env.PORT || 3001;

var app = express();

const middleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

app.use(express.json());
app.use(middleware);
app.use(router);


app.get("/", (req, res) => {
    res.status(200).send("Application is RUNNING..........!!!!!!!!!!!")
})

app.listen(PORT, () => {
    console.log(`Application start running on port ${PORT}`)
})