CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    login    VARCHAR NOT NULL,
    name     VARCHAR NOT NULL,
    role     VARCHAR NOT NULL,
    passHash VARCHAR NOT NULL
);