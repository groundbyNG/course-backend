import express from 'express';
import User from '../../models/user';
import {getCredentials, jwtMW} from "../../middleware/auth";

const dashboardRouter = express.Router();

dashboardRouter.get("/username", jwtMW, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  const { email } = getCredentials(req.headers.authorization.split(' ')[1]);

  User.findOne({ email }, function(err, user){
    if(err) return console.log(err);
    res.send({ username: `${user.name} ${user.surname}`});
  });
});

export default dashboardRouter;