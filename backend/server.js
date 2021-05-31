// import packages
import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import WebSocket from 'ws';

// connect mongo
import mongo from './functions/mongo.js';
dotenv.config();
mongo.connect();

// import functions
import register from './functions/register.js';
import login from './functions/login.js';
import createGroup from './functions/createGroup.js';
import joinGroup from './functions/joinGroup.js';
import index from './functions/index.js';
import renewProfile from './functions/renewProfile.js';
import group from './functions/group.js';
import renewFile from './functions/renewFile.js';
import createDiscussion from './functions/createDisscussion.js';
import discussion from './functions/discussion.js';
import time from './functions/time.js';

// init server
const app = express();
const server = http.createServer(app);
app.use(express.static("./public"));
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
      case "register":
        register(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "login":
        login(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "index":
        index(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "createGroup":
        createGroup(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "joinGroup":
        joinGroup(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "renewProfile":
        renewProfile(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "group":
        group(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "renewFile":
        renewFile(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "createDiscussion":
        createDiscussion(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "discussion":
        discussion(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
        );
        break;
      case "time":
        time(data).then(
          (ret) => {
            ret.api = api;
            ws.sendEvent(ret);
          }
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
