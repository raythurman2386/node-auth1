import server from './api/server';

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`\nServer listening on port: ${PORT}\n`)
})