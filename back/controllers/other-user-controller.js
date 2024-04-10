import {pool} from '../db.js';

export const getOtherUserByRole = async (req, res) => {
    const {myRole} = req.query;
    const position = await pool.query("SELECT * FROM positions WHERE name=$1", [myRole]);
    const childrenPosition = await pool.query("SELECT * FROM positions WHERE parentpositionid=$1", [position.rows[0].id]);
    if (!childrenPosition.rows.length) {
        res.json([]);
        return;
    }
    const positionId = childrenPosition.rows[0].id;

    const users = await pool.query("SELECT * FROM users WHERE positionid=$1", [positionId]);

    const result = users.rows.map(({name, id, positionid}) => ({
        name,
        id,
        role: position.rows[0].name
    }))
    res.json(result);
}