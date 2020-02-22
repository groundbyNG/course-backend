import express from 'express';
import MathStatistic from '../../models/math-statistic';
import Math from '../../models/math';
import User from '../../models/user';
import {getCredentials, jwtMW} from "../../middleware/auth";

const mathStatRouter = express.Router();
const jsonParser = express.json();

mathStatRouter.post("/", jwtMW, jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { _id , answer } = req.body;

  Math.findOne({ _id }, function(err, task){
    if(err) return console.log('cant find question', err);

    const { email } = getCredentials(req.headers.authorization.split(' ')[1]);

    MathStatistic.findOne({ email }, function(err, stats){
      if(err) return console.log('cant find statistic', err);
      if (task.answer == answer) {
        stats.correct += 10;
      }
      stats.attempts += 1;
      stats.save(function(err){
        if(err) return console.log(err);
      });
    });
    res.send({
      status: 200,
    });
  });
});

mathStatRouter.get("/", jwtMW, jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { email } = getCredentials(req.headers.authorization.split(' ')[1]);

  MathStatistic.findOne({ email }, function(err, stats){
    if(err) return console.log(err);
    res.send({ stat: stats.correct });
  });
});

mathStatRouter.get("/top", jwtMW, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  MathStatistic.find({}).sort({ correct: 'desc' }).exec(function(err, stats){
    if(err) return console.log(err);
    const top = stats.slice(0, 5);
    const results = top.map(async stat => {
      const user = await User.findOne({ email: stat.email }).exec();
      stat.email = `${user.name} ${user.surname}`;
      return stat;
    });
    Promise.all(results).then(() => {
      res.send(top);
    });
  });
});

mathStatRouter.get("/all", jwtMW, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
  if (role === 'student') {
    MathStatistic.findOne({ email }, function(err, stat){
      if(err) return console.log(err);
      res.send(stat);
    });
  } else {
    MathStatistic.find({}, function(err, stat){
      if(err) return console.log(err);
      res.send(stat);
    });
  }

});

export default mathStatRouter;