import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./Router/index.mjs";
import { user } from "./util/userData.mjs";
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

app.use(cookieParser("checking"));
app.use(session({
    secret: "I am Bat-Man",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(express.json());
app.use(middleware);
app.use(router);


app.get("/", (req, res) => {
    req.session.visited = true;
    res.cookie("Cookies", "learning", {maxAge: 60000 * 60, signed: true })
    res.status(200).send("Application is RUNNING..........!!!!!!!!!!!")
})


app.post("/api/login", (req, res) => {
    const { body: {name, password} } = req;
    const checkUser = user.find((user) => user.name === name);
    if(!checkUser || checkUser.password !== password) 
        return res.status(401).send("Wrong username or Bad Credentials")
    
    req.session.user = checkUser;
    return res.status(200).send(checkUser);
    
})

app.get("/api/auth/status", (req,res) => {
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "Not Authenticated"})
})

app.listen(PORT, () => {
    console.log(`Application start running on port ${PORT}`)
})