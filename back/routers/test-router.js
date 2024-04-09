import express from "express";
import {addTest, deleteTest, getAllTests} from "../controllers/test-controller.js";

export const testRouter = express.Router();

testRouter
    .route('/add')
    .post(addTest);

testRouter
    .route('/delete')
    .delete(deleteTest);

testRouter
    .route('/list')
    .get(getAllTests);