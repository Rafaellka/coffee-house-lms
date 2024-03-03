CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    login    VARCHAR NOT NULL,
    name     VARCHAR NOT NULL,
    role     VARCHAR NOT NULL,
    passHash VARCHAR NOT NULL
);

CREATE TABLE tracks
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL
)

CREATE TABLE lectures
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    trackId INTEGER NOT NULL,
    orderInTrack SERIAL NOT NULL
)

CREATE TABLE tests
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    trackId INTEGER NOT NULL,
    orderInTrack SERIAL NOT NULL
)

CREATE TABLE questions
(
    testId INTEGER NOT NULL,
    questionText VARCHAR NOT NULL,
    rightAnswerId INTEGER NOT NULL,
    orderInTest INTEGER NOT NULL
)

CREATE TABLE answers
(
    id SERIAL PRIMARY KEY,
    text VARCHAR NOT NULL,
    questionId INTEGER NOT NULL
)