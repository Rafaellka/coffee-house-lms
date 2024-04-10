import pg from 'pg';

const {Pool} = pg;
export const pool = new Pool({
    database: 'coffee-house',
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432'
});


