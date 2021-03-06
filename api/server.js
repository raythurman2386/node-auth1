import express from 'express';
import session from 'express-session';
import router from './users/users.router';
import sessionConfig from './session/sessionConfig';

const server = express();
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', router);

server.use((req, res, next) => {
  return res.status(400).json({ message: 'That route does not exist' })
})

server.use((err, req, res, next) => {
  return res.status(500).json({ message: 'Something is very wrong' })
})

export default server;