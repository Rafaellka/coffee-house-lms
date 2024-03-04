import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import {corsConfig, sessionMiddleware} from "./controllers/server-controller.js";
import {authRouter} from "./routers/auth-router.js";
import {trackRouter} from "./routers/track.router.js";
import {lectureRouter} from "./routers/lecture-router.js";

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

app.use('/auth', authRouter);
app.use('/track', trackRouter);
app.use('/lecture', lectureRouter);

server.listen(8080, () => console.log(`Сервер запущен на 8080`));
