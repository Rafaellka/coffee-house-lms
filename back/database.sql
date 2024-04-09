CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    login    VARCHAR NOT NULL,
    name     VARCHAR NOT NULL,
    passHash VARCHAR NOT NULL,
    positionId INTEGER NOT NULL
);

CREATE TABLE positions
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE tracks
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    positionId INTEGER NOT NULL
);

CREATE TABLE lectures
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    videoUrl VARCHAR NOT NULL,
    trackId INTEGER NOT NULL,
    text VARCHAR NOT NULL
);

CREATE TABLE tests
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    trackId INTEGER NOT NULL
);

CREATE TABLE questions
(
    id SERIAL PRIMARY KEY,
    testId INTEGER NOT NULL,
    text VARCHAR NOT NULL
);

CREATE TABLE answers
(
    id SERIAL PRIMARY KEY,
    text VARCHAR NOT NULL,
    questionId INTEGER NOT NULL,
    isRightAnswer BOOL NOT NULL
);

CREATE TABLE userTrack
(
  userId INTEGER NOT NULL,
  trackId INTEGER NOT NULL
);

CREATE TABLE userLecture
(
    userId INTEGER NOT NULL,
    lectureId INTEGER NOT NULL
);

CREATE TABLE userTest
(
    userId INTEGER NOT NULL,
    testId INTEGER NOT NULL
);