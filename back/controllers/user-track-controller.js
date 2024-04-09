import {pool} from '../db.js';

export const saveUserPassedTrack = async (req, res) => {
    const trackId = req.body.trackId;
    const userId = req.body.userId;
    const isExists = await pool.query("SELECT * FROM userTrack WHERE userid=$1 AND trackid=$2 ", [userId, trackId]);
    if (!isExists.rows[0]) {
        const userTrack = await pool.query("INSERT INTO userTrack (userId, trackId) VALUES ($1, $2) ", [userId, trackId]);
    }
    res.json();
}

export const userFailedTrack = async (req, res) => {
    const trackId = req.body.trackId;
    const userId = req.body.userId;
    const userTrack = await pool.query("DELETE FROM userTrack WHERE userid=$1 AND trackid=$2 ", [userId, trackId]);

    res.json();
}

export const getUserPassedTracks = async (req, res) => {
    const userId = req.query.userId;
    const passedTracks = await pool.query("SELECT * FROM userTrack WHERE userid=$1", [userId]);
    const tracks = passedTracks.rows.map(({userid, trackid}) => trackid);

    res.json(tracks);
}