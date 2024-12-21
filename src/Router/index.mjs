import { Router } from "express";
import userrouter from "./routes.mjs";
import moviesRouter from "./moviesRoutes.mjs";
import authRouter from "./authRoute.mjs";

const router = Router();

router.use(userrouter);
router.use(moviesRouter);
router.use(authRouter);


export default router;
