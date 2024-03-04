import express from "express";
import {createQuestion, getQuestionsInTest} from "../controllers/question-controller.js";

export const questionRouter = express.Router();

questionRouter
    .route('/list')
    .get(getQuestionsInTest)

questionRouter
    .route('/create')
    .post(createQuestion)