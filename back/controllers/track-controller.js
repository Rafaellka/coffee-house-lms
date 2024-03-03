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

export const getLecturesAndTestInTrack = async (req, res) => {
    const trackId = req.query.trackId;
    const lectures = await pool.query("SELECT * FROM lectures WHERE trackid=$1", [trackId]);
    const tests = await pool.query("SELECT * FROM tests WHERE trackid=$1", [trackId]);

    res.json({
        lectures: lectures.rows,
        tests: tests.rows
    });
}