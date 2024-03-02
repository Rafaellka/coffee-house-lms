import pg from 'pg';

const {Pool} = pg;
export const pool = new Pool({
    database: 'coffee-house',
    user: 'postgres',
    password: 'Gfhjcjkmrf1972',
    host: 'localhost',
    port: '5433'
});

