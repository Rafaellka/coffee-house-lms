import {pool} from "../db.js";

export const getAllLectures = async (req, res) => {
    const result = await pool.query("SELECT * FROM lectures");

    const lecturesRows = result.rows.map(({name, id, videourl, trackid, text}) => ({
        name,
        id,
        text,
        videoUrl: videourl,
        trackId: trackid
    }))
    res.json(lecturesRows);
}

export const addLecture = async (req, res) => {
    const {name, trackId, videoUrl, text} = req.body;
    await pool.query("INSERT INTO lectures (name, trackid, videourl, text) values ($1, $2, $3, $4)", [name, trackId, videoUrl, text]);

    res.json();
}

export const deleteLecture = async (req, res) => {
    const {lectureId} = req.query;
    await pool.query("DELETE FROM lectures WHERE id = $1", [lectureId]);
    await pool.query("DELETE FROM userLecture WHERE lectureid = $1", [lectureId]);
    res.json();
}