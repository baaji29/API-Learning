import { Router } from "express";
import { movies } from "../util/userData.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";
import { authorizeRole } from "../middleware/authorizeRole.mjs";

const moviesRouter = Router();

const movie = movies;

moviesRouter.get("/movies", verifyToken, authorizeRole("user"), (req, res) => {
    if(req.signedCookies.Cookies && req.signedCookies.Cookies === "learning")
        return res.status(200).send(movie);
    
    return res.status(403).send([{err: "Sorry....!, There is no cookies or cookies is wrong..! "}])
    
})

export default moviesRouter;