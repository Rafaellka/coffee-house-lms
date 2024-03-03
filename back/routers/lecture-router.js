import express from "express";

export const lectureRouter = express.Router();

lectureRouter
    .route('/')
    .get()