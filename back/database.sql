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
    text VARCHAR NOT NULL
)

CREATE TABLE tracks-lectures
(
    trackId SERIAL,
    lectureId SERIAL,
    lectureOrder SERIAL
)

CREATE TABLE tests
(
    id SERIAL PRIMARY KEY,
    question VARCHAR NOT NULL,
    rightAnswerId SERIAL
)

CREATE TABLE answers
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    text VARCHAR NOT NULL
)

CREATE TABLE tests-answers
(
    testId SERIAL,
    answerId SERIAL
)