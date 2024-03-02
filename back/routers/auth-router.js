import express from "express";
import {tryToLogin, tryToRegister} from "../controllers/auth-controller.js";

export const authRouter = express.Router();

authRouter
    .route('/login')
    .post(tryToLogin);

authRouter
    .route('/register')
    .post(tryToRegister);