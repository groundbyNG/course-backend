import jwt from 'jsonwebtoken';
import exjwt from 'express-jwt';
import {privateKey} from "../constants";

export const jwtMW = exjwt({
  secret: privateKey
});

export const generateToken = (error, user, res) => {
    if (error || !user) {
      return res.status(401).json({
        sucсess: false,
        token: null,
        err: 'Username or password is incorrect'
    });
    } else {
      const token = jwt.sign({ email: user.email, role: user.role }, privateKey, { expiresIn: 129600 }); // Sigining the token
        
      return res.send({
        suсcess: true,
        err: null,
        token,
        role: user.role,
      });
    }
};

export const getCredentials = (authorizationHeader) => {
  return jwt.verify(authorizationHeader, privateKey);
};




