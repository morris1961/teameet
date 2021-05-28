// import packages
import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import WebSocket from 'ws';
import path from "path";

// connect mongo
import mongo from './functions/mongo';
dotenv.config();
mongo.connect();

// import functions
import regester from './functions/regester';
import login from './functions/login';
import createGroup from './functions/createGroup';
import joinGroup from './functions/joinGroup';
import index from './functions/index';
import renewProfile from './functions/renewProfile';
import group from './functions/group';
import renewFile from './functions/renewFile';
import createDiscussion from './functions/createDisscussion';
import discussion from './functions/discussion';
import time from './functions/time';

// init server
const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public')));
const wss = new WebSocket.Server({
  server,
});

wss.on('connection', async function connection(ws) {

  // init ws
  console.log('server connected!')
  ws.sendEvent = (e) => ws.send(JSON.stringify(e));

  // handle message
  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    const { api, data } = message;
    switch (api) {
      case "regester":
        regester(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "login":
        login(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "index":
        index(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "createGroup":
        createGroup(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "joinGroup":
        joinGroup(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "renewProfile":
        renewProfile(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "group":
        group(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "renewFile":
        renewFile(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "createDiscussion":
        createDiscussion(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "discussion":
        discussion(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      case "time":
        time(data).then(
          (ret) => { ws.sendEvent(ret); }
        );
        break;
      default:
        console.log("QQ");
        break;
    }
  });
});

const PORT = process.env.port || 4000
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
