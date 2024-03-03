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

    res.json({
        loggedIn: true,
        user: {
            id: user.id,
            name: user.name,
            role: user.role
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
    await pool.query(
        `INSERT INTO users(login, name, role, passhash)
         VALUES ($1, $2, $3, $4)`,
        [login, name, role, passHash]
    );

    res.json({
        loggedIn: true,
        user: {
            name, role
        }
    });
};