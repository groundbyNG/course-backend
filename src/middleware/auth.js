import jwt from 'jsonwebtoken';
import exjwt from 'express-jwt';

export const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});

export const generateToken = (error, user, res) => {
    if (error || !user) {
      return res.status(401).json({
        sucсess: false,
        token: null,
        err: 'Username or password is incorrect'
    });
    } else {
      const token = jwt.sign({ passportId: user.passportId }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
        
      return res.send({
        suсcess: true,
        err: null,
        token,
      });
    }
}




