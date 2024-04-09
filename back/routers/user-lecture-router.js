import express from "express";
import {getUserPassedLectures, saveUserPassedLecture} from "../controllers/user-lecture-controller.js";


export const userLectureRouter = express.Router();

userLectureRouter
    .route('/passed')
    .post(saveUserPassedLecture);

userLectureRouter
    .route('/list')
    .get(getUserPassedLectures);