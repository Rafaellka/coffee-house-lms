import express from "express";
import {addTrack, getTrackList} from "../controllers/track-controller.js";

export const trackRouter = express.Router();

trackRouter
    .route('/list')
    .get(getTrackList);

trackRouter
    .route('/add')
    .post(addTrack)