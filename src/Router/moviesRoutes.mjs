import { Router } from "express";
import { movies } from "../util/userData.mjs";
import { verifyToken } from "../middleware/authMiddleware.mjs";
import { authorizeRole } from "../middleware/authorizeRole.mjs";

const moviesRouter = Router();

const movie = movies;

moviesRouter.get("/movies", verifyToken, authorizeRole("user"), (req, res) => {
        return res.status(200).send(movie);    
})

export default moviesRouter;