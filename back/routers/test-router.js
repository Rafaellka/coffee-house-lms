import express from "express";
import {addTest} from "../controllers/test-controller.js";

export const testRouter = express.Router();

testRouter
    .route('/add')
    .post(addTest)