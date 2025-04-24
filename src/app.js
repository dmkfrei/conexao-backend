import cors from 'cors';
import express from 'express';
import 'dotenv/config.js';
import Rotas from './rotas.js';

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cors());
Rotas(server);

server.listen(PORT, () => console.log(`API! ${PORT}`));