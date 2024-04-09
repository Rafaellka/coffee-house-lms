import express from "express";
import {addLecture, deleteLecture, getAllLectures} from "../controllers/lecture-controller.js";

export const lectureRouter = express.Router();

lectureRouter
    .route('/add')
    .post(addLecture);

lectureRouter
    .route('/delete')
    .delete(deleteLecture);

lectureRouter
    .route('/list')
    .get(getAllLectures);