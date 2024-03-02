import {Pool} from 'pg';

export const pool = new Pool({
    database: 'coffee-house',
    user: 'postgres',
    password: 'Gfhjcjkmrf1972',
    host: 'localhost',
    port: '5433'
});

