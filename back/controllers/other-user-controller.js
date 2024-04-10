import {pool} from '../db.js';

export const getOtherUserByRole = async (req, res) => {
    const {myRole} = req.query;
    const position = await pool.query("SELECT * FROM positions WHERE name=$1", [myRole]);
    const childrenPosition = await pool.query("SELECT * FROM positions WHERE parentpositionid=$1", [position.rows[0].id]);
    const positionId = childrenPosition.rows[0].id;
    const users = await pool.query("SELECT * FROM positions WHERE positionId=$1", [positionId]);

    const result = users.rows.map(({name, id, positionid}) => ({
        name,
        id,
        positionId: positionid
    }))
    res.json(result);
}
