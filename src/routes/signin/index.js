import express from 'express';
import User from '../../models/user';
import { generateToken } from '../../middleware/auth';

const signin = express.Router();
const jsonParser = express.json();
    
signin.post("/", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { email, password } = req.body;

    User.authenticate(email, password, (err, user) => generateToken(err, user, res));
});
 
export default signin;