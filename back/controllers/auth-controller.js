import bcrypt from 'bcrypt';
import {pool} from '../db.js';

export const tryToLogin = async (req, res) => {
    const {login, password} = req.body;
    const potentialLogin = await pool.query(
        "SELECT * FROM users WHERE login=$1",
        [login]
    );

    if (potentialLogin.rowCount === 0) {
        return res.json({
            loggedIn: false,
            status: "⚠ Неправильный никнейм или пароль!",
        });
    }

    const user = potentialLogin.rows[0];
    const isSamePass = await bcrypt.compare(password, user.passhash);

    if (!isSamePass) {
        return res.json({
            loggedIn: false,
            status: "⚠ Неправильный пароль!"
        });
    }
    const role = await pool.query(
        "SELECT * FROM positions WHERE id=$1",
        [user.positionid]
    );
    res.json({
        loggedIn: true,
        user: {
            id: user.id,
            name: user.name,
            role: role.rows[0].name
        }
    });
};

export const tryToRegister = async (req, res) => {
    const {name, login, password, role} = req.body;
    const existingUser = await pool.query(
        `SELECT login
         from users
         WHERE login = $1`,
        [login]
    );

    if (existingUser.rowCount > 0) {
        return res.json({
            loggedIn: false,
            status: "⚠ Никнейм занят"
        });
    }

    const passHash = await bcrypt.hash(password, 7);
    const positionId = await pool.query("SELECT * FROM positions WHERE name=$1", [role]);
    const insertRes = await pool.query(
        `INSERT INTO users(login, name, positionId, passhash) VALUES ($1, $2, $3, $4) RETURNING id`,
        [login, name, positionId.rows[0].id, passHash]
    );
    const id = insertRes.rows[0].id;

    res.json({
        loggedIn: true,
        user: {
            name, role, id
        }
    });
};