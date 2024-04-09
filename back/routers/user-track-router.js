import express from "express";
import {getUserPassedTracks, saveUserPassedTrack, userFailedTrack} from "../controllers/user-track-controller.js";


export const userTrackRouter = express.Router();

userTrackRouter
    .route('/passed')
    .post(saveUserPassedTrack);

userTrackRouter
    .route('/failed')
    .post(userFailedTrack);

userTrackRouter
    .route('/list')
    .get(getUserPassedTracks);