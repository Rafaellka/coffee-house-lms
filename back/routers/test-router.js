import express from "express";
import {addTest, deleteTest} from "../controllers/test-controller.js";

export const testRouter = express.Router();

testRouter
    .route('/add')
    .post(addTest)

testRouter
    .route('/delete')
    .delete(deleteTest)