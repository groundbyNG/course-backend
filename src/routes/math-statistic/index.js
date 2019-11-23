import express from 'express';
import TaskStatistic from '../../models/math-statistic';
import { jwtMW } from "../../middleware/auth";

const mathStatRouter = express.Router();
const jsonParser = express.json();

mathStatRouter.post("/", jwtMW, jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { email, task, correct } = req.body;

    const taskStat = new TaskStatistic({
        email,
        task,
        correct
    });

    taskStat.save(function(err){
        if(err) return console.log(err);
        res.send({
            status: 200,
        });
    });
});

mathStatRouter.get("/", jwtMW, jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { email } = req.body;

    TaskStatistic.find({ email }, function(err, stats){

        if(err) return console.log(err);
        res.send(stats);
    });
});

export default mathStatRouter;