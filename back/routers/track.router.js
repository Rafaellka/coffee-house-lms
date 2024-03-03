import express from "express";
import {addTrack, getLecturesAndTestInTrack, getTrackList} from "../controllers/track-controller.js";

export const trackRouter = express.Router();

trackRouter
    .route('/list')
    .get(getTrackList);

trackRouter
    .route('/add')
    .post(addTrack)

trackRouter
    .route('/details')
    .get(getLecturesAndTestInTrack)