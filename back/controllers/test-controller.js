import {pool} from "../db.js";

export const addTest = async (req, res) => {
    const {name, trackId} = req.body;
    await pool.query("INSERT INTO tests (name, trackid) values ($1, $2)", [name, trackId]);

    res.json();
}