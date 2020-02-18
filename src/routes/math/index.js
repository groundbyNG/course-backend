import express from 'express';
import Math from '../../models/math';
import isTeacher from '../../middleware/isTeacher';
import shuffle from "../../helpers/shuffle";
import { jwtMW } from "../../middleware/auth";

const mathRouter = express.Router();
const jsonParser = express.json();

mathRouter.post("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { question, answer } = req.body;

    const mathTask = new Math({ question, answer });

    mathTask.save(function(err){
        if(err) return console.log('mathTask save error', err);
        res.send({ status: 200 });
    });
});

mathRouter.get("/", jwtMW, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    Math.find({}, function(err, tasks){
        if(err) return console.log('get math tasks error', err);
        res.send(shuffle(tasks));
    });
});

mathRouter.put("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { question, answer, id } = req.body;

    Math.findOne({ _id: id }, (err, mathTask) => {
        if(err) return console.log('cant find math task', err);

        mathTask.question = question;
        mathTask.answer = answer;

        mathTask.save(function(err){
            if(err) return console.log('mathTask save error', err);
            res.send({ status: 200 });
        });
    });
});

mathRouter.delete("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { id } = req.body;

    Math.findOneAndDelete({ _id: id }, function(err, task){
        if(err) return console.log('delete math task error', err);
        res.send(task);
    });
});

export default mathRouter;