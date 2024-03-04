import {pool} from "../db.js";

export const addLecture = async (req, res) => {
    const {name, trackId, videoUrl, text} = req.body;
    await pool.query("INSERT INTO lectures (name, trackid, videourl, text) values ($1, $2, $3, $4)", [name, trackId, videoUrl, text]);

    res.json();
}