import { Router } from "express";
import { movies } from "../util/userData.mjs";

const moviesRouter = Router();

const movie = movies;

moviesRouter.get("/movies", (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies.Cookies)
    if(req.signedCookies.Cookies && req.signedCookies.Cookies === "learning")
        return res.status(200).send(movie);
    
    return res.status(403).send([{err: "Sorry....!, There is no cookies or cookies is wrong..! "}])
    
})

export default moviesRouter;