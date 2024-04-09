import {pool} from "../db.js";

export const getAllTests = async (req, res) => {
    const result = await pool.query("SELECT * FROM tests");

    const testRows = result.rows.map(({name, id, trackid}) => ({
        name,
        id,
        trackId: trackid
    }))
    res.json(testRows);
}

export const addTest = async (req, res) => {
    const {name, trackId} = req.body;
    await pool.query("INSERT INTO tests (name, trackid) values ($1, $2)", [name, trackId]);

    res.json();
}

export const deleteTest = async (req, res) => {
    const {testId} = req.query;
    await pool.query("DELETE FROM tests WHERE id = $1", [testId]);
    await pool.query("DELETE FROM userTest WHERE testid = $1", [testId]);
    res.json();
}