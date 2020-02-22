import express from 'express';
import User from '../../models/user';
import Vocabulab from '../../models/vocabulab';
import isTeacher from '../../middleware/isTeacher';
import {getCredentials, jwtMW} from "../../middleware/auth";

const vocabulabRouter = express.Router();
const jsonParser = express.json();

vocabulabRouter.post("/", jwtMW, jsonParser, isTeacher, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { russian, english, description, category } = req.body;

  User.find({}, (err, users) => {
    users.forEach(user => {
      if (user.role === 'student') {
        const vocabulabPair = new Vocabulab({
          russian,
          english,
          description,
          checked: false,
          category,
          userId: user.email,
        });
        vocabulabPair.save(function(err){
          if(err) return console.log('vocabulabPair save error', err);
        });
      }
    });
    res.send({ status: 200 });
  });
});

vocabulabRouter.get("/", jwtMW, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
  if (role === 'teacher') {
    const user = await User.findOne({ role: 'student' }).exec();
    email = user.email;
  }
  Vocabulab.find({ userId: email }, (err, pairs) => {
    if(err) return console.log('cant find pairs', err);
    res.send(pairs);
  });
});

vocabulabRouter.put("/", jwtMW, jsonParser, isTeacher, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { russian, english, description, category } = req.body;


  Vocabulab.find({ english }, (err, pairs) => {
    if(err) return console.log('cant find pairs', err);
    pairs.forEach(pair => {
      pair.russian = russian;
      pair.description = description;
      pair.category = category;

      pair.save(function(err){
        if(err) return console.log('pair save error', err);
      });
    });
    res.send({ status: 200 });
  });
});

vocabulabRouter.delete("/", jwtMW, jsonParser, isTeacher, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { english } = req.body;

  Vocabulab.deleteMany({ english }, function(err, task){
    if(err) return console.log('delete math task error', err);
    res.send(task);
  });
});

vocabulabRouter.put("/check", jwtMW, jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

  const { english, checked } = req.body;
  const { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
  if (role !== 'teacher') {
    Vocabulab.findOne({ english, userId: email }, function(err, pair){
      if(err) return console.log('find pair error', err);

      pair.checked = checked;
      pair.category = checked ? '3' : '1';
      pair.save(function(err){
        if(err) return console.log('pair save error', err);
      });
      res.send({ status: 200 });
    });
  }
});

export default vocabulabRouter;