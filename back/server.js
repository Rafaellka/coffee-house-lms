import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {sessionMiddleware, corsConfig} from './controllers/server-controller';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

server.listen(8080, () => console.log(`Сервер запущен на 8080`));
