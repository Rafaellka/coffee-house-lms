import {pool} from '../db.js';

export const saveUserTestResult = async (req, res) => {
    const testId = req.body.testId;
    const userId = req.body.userId;
    const isExists = await pool.query("SELECT * FROM userTest WHERE userid=$1 AND testid=$2 ", [userId, testId]);
    if (!isExists.rows[0]) {
        const userTest = await pool.query("INSERT INTO userTest (userId, testId) VALUES ($1, $2) ", [userId, testId]);
    }
    res.json();
}

export const getUserPassedTests = async (req, res) => {
    const userId = req.query.userId;
    const passedTests = await pool.query("SELECT * FROM userTest WHERE userid=$1", [userId]);
    const tests = passedTests.rows.map(({userid, testid}) => testid);

    res.json(tests);
}