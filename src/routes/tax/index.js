import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { jwtMW } from '../../middleware/auth';

const jsonParser = express.json();
export const taxRouter = express.Router();

export const sendUserCreateRequest = (req, res, next) => {
    const {
        passportId,
        name,
        surname,
    } = req.body;
    axios.post(
        `http://localhost:8787/api/users/`, 
        JSON.stringify({
            passportId, name, surname, incomeSum: 0
        }),
        {headers: {'Content-Type': 'application/json'}}
    )
    .then((response) => {
        console.log('Tax created user', response.status);
        next();
    })
    .catch((error) => {
        next(error);
    })
}

export const sendTaxRequest = (req, res, next) => {
    const {
        destination,
        amount,
        tax,
    } = req.body;
    const { passportId } = jwt.verify(req.headers.authorization.split(' ')[1], 'keyboard cat 4 ever');
    
    axios.post(
        `http://localhost:8787/api/taxes/${passportId}`, 
        JSON.stringify({
            destination,
            amount,
            tax,
        }),
        {headers: {'Content-Type': 'application/json'}}
    )
    .then((response) => {
        console.log('Tax saved transaction', response.status);
        next();
    })
    .catch((error) => {
        next(error);
    })
}

taxRouter.get("/", jsonParser, jwtMW, function(req, res){
    const { passportId } = jwt.verify(req.headers.authorization.split(' ')[1], 'keyboard cat 4 ever');
    
    axios.get(`http://localhost:8787/api/taxes/taxRate/${passportId}`)
    .then((response) => {
        res.send({
            taxRate: response.data.taxRate,
        })
    })
});