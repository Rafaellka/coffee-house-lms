import {pool} from "../db.js";

export const getQuestionsInTest = async (req, res) => {
    const testId = req.query.testId;
    const data = await pool.query("SELECT * FROM questions WHERE testid = $1", [testId]);

    const rowsWithAnswers = [];
    for (let row of data.rows) {
        const result = await pool.query("SELECT * FROM answers WHERE questionid = $1", [row.id]);
        const answers = await result.rows;
        rowsWithAnswers.push({
            ...row,
            answers
        })
    }

    res.json(rowsWithAnswers);

}

export const createQuestion = async (req, res) => {
    const {text, testId, answers} = req.body;
    const result = await pool.query("INSERT INTO questions(text, testId) VALUES ($1, $2) RETURNING id", [text, testId]);
    const id = result.rows[0].id;
    const createAnswer = async (answer) => {
        await pool.query("INSERT INTO answers(text, questionId, isrightanswer) VALUES ($1, $2, $3) RETURNING id", [answer.text, id, answer.isrightanswer]);
    }
    for (const answer of answers) {
        await createAnswer(answer);
    }
    res.json();
}