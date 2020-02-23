import express from 'express';
import Library from '../../models/library';
import LibraryStat from '../../models/library-statistic';
import User from '../../models/user';
import WebSocketServer from 'ws';
import {getCredentials, jwtMW} from "../../middleware/auth";

const libraryStatRouter = express.Router();
const jsonParser = express.json();

const students = {};
const webSocketServer = new WebSocketServer.Server({ port: 8888 });
webSocketServer.on('connection', async (ws) => {
  let isInitMessage = true;
  const id = Math.random();
  let studentEmail;

  ws.on('message', async (token) => {
    if (isInitMessage) {
      const { email } = getCredentials(token);
      studentEmail = email;
      students[id] = {
        socket: ws,
        startTime: +new Date(),
      };
      const timeStat = await LibraryStat.findOne({ email: studentEmail }).exec();
      ws.send(JSON.stringify({time: timeStat.time}));
      isInitMessage = false;
    }
  });

  ws.on('close', () => {
    LibraryStat.findOne({ email: studentEmail }, function(err, stats){
      if(err) return console.log(err);


      stats.time += +new Date() - students[id].startTime;
      stats.save();
      delete students[id];
    });
  });
});

libraryStatRouter.get("/", jwtMW, jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
  if (role === 'teacher') {
    User.find({role: 'student'}, (err, users) => {
      const result = users.map(async (user) => {
        const resources = await Library.find({ userId: user.email }).exec();
        const timeStat = await LibraryStat.findOne({ email: user.email }).exec();

        return {
          email: user.email,
          visited: resources.filter((resource) => resource.checked).length,
          notVisited: resources.filter((resource) => !resource.checked).length,
          time: timeStat.time,
        };
      });
      Promise.all(result).then((mappedUsers) => {
        res.send(mappedUsers);
      });
    });
  } else {
    Library.find({ userId: email }, (err, resourceStat) => {
      res.send({
        learned: resourceStat.filter((resource) => resource.checked).length,
      });
    });
  }
});

export default libraryStatRouter;