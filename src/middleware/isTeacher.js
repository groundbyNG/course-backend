import {getCredentials} from "./auth";

const isTeacher = (req, res, next) => {
    const { role } = getCredentials(req.headers.authorization.split(' ')[1]);

    if (role !== 'teacher') {
        return res.status(400).json({
            sucсess: false,
            token: null,
            err: `You're not a teacher`,
        });
    } else {
       next();
    }
}

export default isTeacher;