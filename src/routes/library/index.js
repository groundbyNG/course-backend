import express from 'express';
import isTeacher from '../../middleware/isTeacher';
import {getCredentials, jwtMW} from "../../middleware/auth";
import User from "../../models/user";
import Library from "../../models/library";

const libraryRouter = express.Router();
const jsonParser = express.json();

libraryRouter.post("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { title, link } = req.body;

    User.find({}, (err, users) => {
        users.forEach(user => {
            if (user.role === 'student') {
                const resource = new Library({
                    title,
                    link,
                    checked: false,
                    userId: user.email,
                });
                resource.save(function(err){
                    if(err) return console.log('library resource save error', err);
                });
            }
        });
        res.send({ status: 200 });
    });
});

libraryRouter.get("/", jwtMW, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    let { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
    if (role === 'teacher') {
        const user = await User.findOne({ role: 'student' }).exec();
        email = user.email;
    }
    Library.find({ userId: email }, (err, resources) => {
        if(err) return console.log('cant find library resource', err);
        res.send(resources);
    });
});

libraryRouter.put("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { title, link } = req.body;


    Library.find({ title }, (err, resources) => {
        if(err) return console.log('cant find library resources', err);
        resources.forEach(resource => {
            resource.link = link;

            resource.save(function(err){
                if(err) return console.log('library resources save error', err);
            });
        });
        res.send({ status: 200 });
    });
});

libraryRouter.delete("/", jwtMW, jsonParser, isTeacher, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const { title } = req.body;

    Library.deleteMany({ title }, function(err, resources){
        if(err) return console.log('delete resources error', err);
        res.send(resources);
    });
});

libraryRouter.put("/check", jwtMW, jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const { title, checked } = req.body;
    const { email, role } = getCredentials(req.headers.authorization.split(' ')[1]);
    if (role !== 'teacher') {
        Library.findOne({ title, userId: email }, function(err, resource){
            if(err) return console.log('find resource error', err);

            resource.checked = checked;
            resource.save(function(err){
                if(err) return console.log('resource save error', err);
            });
            res.send({ status: 200 });
        });
    }
});

export default libraryRouter;