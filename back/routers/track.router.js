import express from "express";
import {
    addTrack,
    getLecturesInTrack, getTestInTrack,
    getTrackList
} from "../controllers/track-controller.js";

export const trackRouter = express.Router();

trackRouter
    .route('/list')
    .get(getTrackList);

trackRouter
    .route('/add')
    .post(addTrack)

trackRouter
    .route('/lectures')
    .get(getLecturesInTrack)

trackRouter
    .route('/tests')
    .get(getTestInTrack)