import express from 'express';
import bodyParser from 'body-parser';
import { api } from '../constants';
import mathRouter from './math';
import mathStatRouter from "./math-statistic";
import vocabulabRouter from './vocabulab';
import vocabulabStatRouter from './vocabulab-statistic';
import signinRouter from './signin';
import signupRouter from './signup';
import dashboardRouter from "./dashboard";
import userRouter from "./user";

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(`${api}/signup`, signupRouter);
app.use(`${api}/signin`, signinRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/dashboard`, dashboardRouter);
app.use(`${api}/math`, mathRouter);
app.use(`${api}/math-stat`, mathStatRouter);
app.use(`${api}/vocabulab`, vocabulabRouter);
app.use(`${api}/vocabulab-stat`, vocabulabStatRouter);

export default app;