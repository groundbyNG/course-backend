import jwt from "jsonwebtoken";

const isTeacher = (req, res, next) => {
    const { role } = jwt.verify(req.headers.authorization.split(' ')[1], 'keyboard cat 4 ever');

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