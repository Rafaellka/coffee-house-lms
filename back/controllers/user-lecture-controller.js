import {pool} from '../db.js';

export const saveUserPassedLecture = async (req, res) => {
    const lectureId = req.body.lectureId;
    const userId = req.body.userId;
    const isExists = await pool.query("SELECT * FROM userLecture WHERE userid=$1 AND lectureId=$2 ", [userId, lectureId]);
    if (!isExists.rows[0]) {
        await pool.query("INSERT INTO userLecture (userId, lectureId) VALUES ($1, $2) ", [userId, lectureId]);
    }

    res.json();
}

export const getUserPassedLectures = async (req, res) => {
    const userId = req.query.userId;
    const passedLectures = await pool.query("SELECT * FROM userLecture WHERE userid=$1", [userId]);
    const lectures = passedLectures.rows.map(({userid, lectureid}) => lectureid);

    res.json(lectures);
}