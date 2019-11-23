import express from 'express';
import bodyParser from 'body-parser';

import transactionRouter from './transaction';
import { taxRouter } from './tax';
import signinRouter from './signin';
import signupRouter from './signup';

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
app.use('/api/transaction', transactionRouter);
app.use('/api/tax', taxRouter);

export default app;