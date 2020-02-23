import express from 'express';
import User from '../../models/user';
import TaskStatistic from "../../models/math-statistic";
import LibraryStatistic from '../../models/library-statistic';
import Vocabulab from '../../models/vocabulab';
import Library from '../../models/library';
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
            username: `${user.name} ${user.surname}`,
            correct: 0,
            attempts: 0,
        });
        taskStat.save(async (err) => {
            const pairs = await Vocabulab.find({}).exec();
            const tempEmail = pairs[0];
            pairs
              .filter(result => tempEmail.userId === result.userId)
              .forEach(result => {
                  const pair = new Vocabulab({
                      russian: result.russian,
                      english: result.english,
                      description: result.description,
                      checked: false,
                      category: result.checked ? '1' : result.category,
                      userId: user.email,
                  });
                  pair.save();
              });
            const resources = await Library.find({}).exec();
            resources
              .filter(result => tempEmail.userId === result.userId)
              .forEach(result => {
                  const resource = new Library({
                      title: result.title,
                      link: result.link,
                      checked: false,
                      userId: user.email,
                  });
                  resource.save();
              });
            const libraryStat = new LibraryStatistic({
                email,
                username: `${user.name} ${user.surname}`,
                time: 0,
            });
            libraryStat.save(() => {
                User.authenticate(email, password, (err, user) => generateToken(err, user, res));
            });
        });
    });
});
 
export default signup;