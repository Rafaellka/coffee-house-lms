import express from "express";
import {getUserPassedTests, saveUserTestResult} from "../controllers/user-test-controller.js";


export const userTestRouter = express.Router();

userTestRouter
    .route('/passed')
    .post(saveUserTestResult);

userTestRouter
    .route('/list')
    .get(getUserPassedTests);