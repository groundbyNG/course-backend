import express from 'express';
import User from '../../models/user';
import MathStatistic from '../../models/math-statistic';
import LibraryStatistic from '../../models/library-statistic';
import Library from '../../models/library';
import {jwtMW} from "../../middleware/auth";
import Vocabulab from "../../models/vocabulab";

const userRouter = express.Router();
const jsonParser = express.json();

userRouter.get("/", jwtMW, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  User.find({}, function(err, users){
    if(err) return console.log('get math tasks error', err);
    res.send(users);
  });
});

userRouter.delete("/", jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const { arr } = req.body;
  arr.forEach(({email}) => {
    User.findOneAndDelete({ email }, async () => {
      await MathStatistic.findOneAndDelete({ email }).exec();
      await LibraryStatistic.findOneAndDelete({ email }).exec();
      await Vocabulab.deleteMany({ userId: email }).exec();
      await Library.deleteMany({ userId: email }).exec();
      res.send({ status: 200 });
    });
  });
});

export default userRouter;