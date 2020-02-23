import express from 'express';
import Vocabulab from '../../models/vocabulab';
import User from '../../models/user';
import {getCredentials, jwtMW} from "../../middleware/auth";

const vocabulabStatRouter = express.Router();
const jsonParser = express.json();

vocabulabStatRouter.get("/", jwtMW, jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
  if (role === 'teacher') {
    User.find({role: 'student'}, (err, users) => {
      const result = users.map(async (user) => {
        const words = await Vocabulab.find({ userId: user.email }).exec();
        return {
          email: user.email,
          username: `${user.name} ${user.surname}`,
          learned: words.filter((word) => word.checked).length,
          notLearned: words.filter((word) => !word.checked).length,
        };
      });
      Promise.all(result).then((mappedUsers) => {
        res.send(mappedUsers);
      });
    });
  } else {
    Vocabulab.find({ userId: email }, function(err, stats){
      if(err) return console.log(err);
      res.send({
        learned: stats.filter((word) => word.checked).length,
      });
    });
  }
});

export default vocabulabStatRouter;