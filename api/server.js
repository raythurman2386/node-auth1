import express from 'express';

const server = express();
server.use(express.json());

server.use('/', (req, res, next) => {
  return res.json({ message: 'Server is working!' })
})

server.use((req, res, next) => {
  return res.status(400).json({ message: 'That route does not exist' })
})

server.use((err, req, res, next) => {
  return res.status(500).json({ message: 'Something is very wrong' })
})

export default server;