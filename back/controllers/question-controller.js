import {pool} from "../db.js";

export const getQuestionsInTest = async (req, res) => {
    const trackId = req.body.trackId;
    const data = await pool.query("SELECT * FROM questions WHERE trackid = $1", [trackId]);
    const rows = data.rows;

    res.json(rows);

}

export const createQuestion = async (req, res) => {

}