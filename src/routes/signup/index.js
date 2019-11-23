import express from 'express';
import User from '../../models/user';
import { sendUserCreateRequest } from '../tax';
import { generateToken } from '../../middleware/auth';

const signup = express.Router();
const jsonParser = express.json();
    
signup.post("/", jsonParser, sendUserCreateRequest, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { passportId, password, name, surname } = req.body;
    const user = new User({ passportId, password, name, surname, incomeSum: 0 });
    
    user.save(function(err){
        if(err) return console.log(err);
        
        User.authenticate(passportId, password, (err, user) => generateToken(err, user, res));
    });
});
 
export default signup;