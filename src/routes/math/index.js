import express from 'express';
import Task from '../../models/math';
import isTeacher from '../../middleware/isTeacher';
import shuffle from "../../helpers/shuffle";
import { jwtMW } from "../../middleware/auth";

const mathRouter = express.Router();
const jsonParser = express.json();

mathRouter.post("/add", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { formula, answer } = req.body;

    const task = new Task({
        formula,
        answer,
    });

    task.save(function(err){
        if(err) return console.log(err);
        res.send({
            status: 200,
        });
    });
});

mathRouter.put("/edit", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { formula, answer, id } = req.body;

    Task.findOne({ _id: id }, (err, task) => {
        if(err) return console.log(err);

        task.formula = formula;
        task.answer = answer;

        task.save(function(err){
            if(err) return console.log(err);
            res.send({
                status: 200,
            });
        });
    });
});

mathRouter.delete("/delete", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { id } = req.body;

    Task.findOneAndDelete({ _id: id }, function(err, task){

        if(err) return console.log(err);
        res.send(task);
    });
});

mathRouter.get("/", jwtMW, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    Task.find({}, function(err, tasks){

        if(err) return console.log(err);
        res.send(shuffle(tasks));
    });
});

export default mathRouter;