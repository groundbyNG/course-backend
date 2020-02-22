import express from 'express';
import User from '../../models/user';
import TaskStatistic from "../../models/math-statistic";
import { generateToken } from '../../middleware/auth';

const signup = express.Router();
const jsonParser = express.json();
    
signup.post("/", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { email, password, name, surname } = req.body;
    const user = new User({ email, password, name, surname, role: 'student' });

    user.save(function(err){
        if(err) return console.log(err);
        const taskStat = new TaskStatistic({
            email,
            correct: 0,
            attempts: 0,
        });
        taskStat.save((err) => {
            User.authenticate(email, password, (err, user) => generateToken(err, user, res));
        });
    });
});
 
export default signup;