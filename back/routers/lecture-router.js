import express from "express";
import {addLecture} from "../controllers/lecture-controller.js";

export const lectureRouter = express.Router();

lectureRouter
    .route('/add')
    .post(addLecture)