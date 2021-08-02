import express from 'express';
import Server from './src/server';

const server = new Server();
const app: express.Application = server.getInstance();

app.listen(8000, () => {
  console.log('open server port: 8000');
});
