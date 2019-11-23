import express from 'express';
import bodyParser from 'body-parser';

import mathRouter from './math';
import signinRouter from './signin';
import signupRouter from './signup';
import mathStatRouter from "./math-statistic";

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/math', mathRouter);
app.use('/api/math-stat', mathStatRouter);

export default app;