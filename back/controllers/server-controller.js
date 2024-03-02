import serverController from 'express-session';

export const sessionMiddleware = serverController({
    secret: 'rdq4312iuh321hu143264hj',
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        expires: 1000 * 60 * 60 * 24 * 7
    }
});

export const corsConfig = {
    origin: 'http://localhost:8100',
    credentials: true
};