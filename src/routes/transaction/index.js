import express from 'express';
import jwt from 'jsonwebtoken';

import Transaction from '../../models/transaction';
import { jwtMW } from '../../middleware/auth';
import { sendTaxRequest } from '../tax';

const transactionRouter = express.Router();
const jsonParser = express.json();

transactionRouter.post("/", jwtMW, jsonParser, sendTaxRequest, function(req, res){
    const {
        destination,
        amount,
        tax,
    } = req.body;
    const { passportId } = jwt.verify(req.headers.authorization.split(' ')[1], 'keyboard cat 4 ever');
    
    const transaction = new Transaction({ 
        destination,
        amount,
        tax,
        passportId,
        date: new Date(),
    });
    
    transaction.save(function(err){
        if(err) return console.log(err);
        res.send({
            status: 200,
        });
    });
});
 
transactionRouter.get("/:id", jwtMW, function(req, res){
         
    const id = req.params.id;
    Transaction.find({passportId: id}, function(err, transactions){
          
        if(err) return res.send('Not found');
        res.send(transactions);
    });
});
   
export default transactionRouter;