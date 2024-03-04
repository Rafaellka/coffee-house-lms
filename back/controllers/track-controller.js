import {pool} from "../db.js";

export const getTrackList = async (req, res) => {
    const tracks = await pool.query("SELECT * FROM tracks");

    res.json(tracks.rows);
}

export const addTrack = async (req, res) => {
    const {name, description} = req.body;
    const id = await pool.query("INSERT INTO tracks (name, description) VALUES ($1, $2)", [name, description]);
    res.json();
}

export const getLecturesInTrack = async (req, res) => {
    const trackId = req.query.trackId;
    const lectures = await pool.query("SELECT * FROM lectures WHERE trackid=$1", [trackId]);

    const lecturesRows = lectures.rows.map(({name, id, videourl, trackid, text}) => ({
        name,
        id,
        text,
        videoUrl: videourl,
        trackId: trackid
    }))
    res.json(lecturesRows);
}

export const getTestInTrack = async (req, res) => {
    const trackId = req.query.trackId;
    const lectures = await pool.query("SELECT * FROM lectures WHERE trackid=$1", [trackId]);
    const tests = await pool.query("SELECT * FROM tests WHERE trackid=$1", [trackId]);

    const lecturesRows = lectures.rows.map(({name, id, videourl, trackid}) => ({
        name,
        id,
        videoUrl: videourl,
        trackId: trackid
    }))
    res.json({
        tests: tests.rows
    });
}