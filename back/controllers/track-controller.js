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