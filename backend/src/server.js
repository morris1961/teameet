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
import place from './functions/place.js';
import voteTime from './functions/voteTime.js';
import addPlace from './functions/addPlace.js';
import votePlace from './functions/votePlace.js';
import confirmTime from './functions/confirmTime.js';
import confirmPlace from './functions/confirmPlace.js';
import send from './functions/message.js';
import chat from './functions/chat.js';
import leaveGroup from './functions/leaveGroup.js';

// init server
const app = express();
const server = http.createServer(app);
if (process.env.NODE_ENV === "devlopment") {
  console.log("devlopment mode");
  app.use(express.static("./public"));
}
else if (process.env.NODE_ENV === "production") {
  console.log("production mode");
  app.use(express.static("../frontend/build"));
}
const wss = new WebSocket.Server({
  server,
});

const onlineGroups = {};

wss.on('connection', async function connection(ws) {

  ws.groups = [];

  // init ws
  console.log('server connected!')
  ws.sendEvent = (e) => ws.send(JSON.stringify(e));

  // handle message
  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    const { api, data } = message;
    console.log(api, data)
    var msg = {};
    msg.api = api;
    switch (api) {
      case "register":
        register(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "login":
        login(data).then(
          (ret) => {
            ws.groups = ret.groups;
            ws.groups.forEach((e) => {
              if (!onlineGroups[e]) {
                onlineGroups[e] = new Set();
              }
              onlineGroups[e].add(ws)
            })
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "index":
        index(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "createGroup":
        createGroup(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "joinGroup":
        joinGroup(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "renewProfile":
        renewProfile(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "group":
        group(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "renewFile":
        renewFile(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "createDiscussion":
        createDiscussion(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "discussion":
        discussion(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "time":
        time(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "place":
        place(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "voteTime":
        voteTime(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "addPlace":
        addPlace(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "votePlace":
        votePlace(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "confirmPlace":
        confirmPlace(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "confirmTime":
        confirmTime(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "chat":
        chat(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      case "message":
        send(data).then(
          (ret) => {
            msg.data = ret;
            onlineGroups[data.GID].forEach((client) => {
              client.send(JSON.stringify(msg));
            });
          }
        );
        break;
      case "leaveGroup":
        leaveGroup(data).then(
          (ret) => {
            msg.data = ret;
            ws.sendEvent(msg);
          }
        );
        break;
      default:
        console.log(message);
        break;
    }
    // disconnected
    ws.onclose = (() => {
      ws.groups.forEach((e) => {
        onlineGroups[e].delete(ws);
      })
    });

  });
});

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
