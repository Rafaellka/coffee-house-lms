import express from "express";
import {getQuestionsInTest} from "../controllers/question-controller.js";

export const questionRouter = express.Router();

questionRouter
    .route('/list')
    .get(getQuestionsInTest)