import express from 'express';
import bodyParser from 'body-parser';

import mathRouter from './math';
import mathStatRouter from "./math-statistic";
import vocabulabRouter from './vocabulab';
import signinRouter from './signin';
import signupRouter from './signup';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/math', mathRouter);
app.use('/api/math-stat', mathStatRouter);
app.use('/api/vocabulab', vocabulabRouter);

export default app;