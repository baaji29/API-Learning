import { Router } from "express";
import { login, register } from "../Controller/authController.mjs";
import { UserValidation } from "../util/validation.mjs";
import { validationMiddleware } from "../middleware/validationMiddleware.mjs";

const authRouter = Router();

authRouter.post("/register", UserValidation, validationMiddleware, register );

authRouter.post("/login", login)

export default authRouter;