import { Router } from "express";
import userrouter from "./routes.mjs";
import moviesRouter from "./moviesRoutes.mjs";

// const Router = require("express");
// const userrouter = require("./routes.mjs");
// const moviesRouter = require("./moviesRoutes.mjs");

const router = Router();

router.use(userrouter);
router.use(moviesRouter);


export default router;
