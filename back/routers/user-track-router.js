import express from "express";
import {getUserPassedTracks, saveUserPassedTrack} from "../controllers/user-track-controller.js";


export const userTrackRouter = express.Router();

userTrackRouter
    .route('/passed')
    .post(saveUserPassedTrack);

userTrackRouter
    .route('/list')
    .get(getUserPassedTracks);