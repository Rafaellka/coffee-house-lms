import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import {corsConfig, sessionMiddleware} from "./controllers/server-controller.js";
import {authRouter} from "./routers/auth-router.js";
import {trackRouter} from "./routers/track.router.js";
import {lectureRouter} from "./routers/lecture-router.js";
import {testRouter} from "./routers/test-router.js";
import {questionRouter} from "./routers/question-router.js";
import {userTestRouter} from "./routers/user-test-router.js";
import {userTrackRouter} from "./routers/user-track-router.js";
import {userLectureRouter} from "./routers/user-lecture-router.js";

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

app.use('/auth', authRouter);
app.use('/track', trackRouter);
app.use('/lecture', lectureRouter);
app.use('/test', testRouter);
app.use('/question', questionRouter);
app.use('/user-test', userTestRouter);
app.use('/user-lecture', userLectureRouter);
app.use('/user-track', userTrackRouter);

server.listen(8080, () => console.log(`Сервер запущен на 8080`));
