import express from 'express';
import User from '../../models/user';
import MathStatistic from '../../models/math-statistic';
import {getCredentials, jwtMW} from "../../middleware/auth";

const userRouter = express.Router();
const jsonParser = express.json();

userRouter.get("/", jwtMW, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  Math.find({}, function(err, tasks){
    if(err) return console.log('get math tasks error', err);
    const { role } = getCredentials(req.headers.authorization.split(' ')[1]);

    if (role === 'student') {
      res.send(shuffle(tasks));
    } else {
      res.send(tasks);
    }
  });
});

userRouter.delete("/", jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const { email } = req.body;

  User.findOneAndDelete({ email }, () => {
    MathStatistic.findOneAndDelete({ email }, () => {
      res.send({ status: 200 });
    });
  });

});

export default userRouter;