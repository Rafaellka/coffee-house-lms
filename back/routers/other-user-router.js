import express from "express";
import {getOtherUserByRole} from "../controllers/other-user-controller.js";


export const otherUserRouter = express.Router();

otherUserRouter
    .route('/list')
    .get(getOtherUserByRole);
