import jwt from 'jsonwebtoken';
import moment from 'moment';
import * as config from '././../config/config';

export const generateAuthToken = async (userId: string) => {
  const expirationTime = moment().add(config.jwt.expirationDays, 'days');
  const jwtPayload = {
    sub: userId,
    iat: moment().unix(),
    exp: expirationTime.unix(),
  };
  return jwt.sign(jwtPayload, 'srethsrh'); // getting error while taking secret key from the config
};

export const createSecretKeyFromPassword = (password: string) => {
  return 'srethsrh' + password;
};

export const createTokenForForgotPassword = (email: string, secret: string) => {
  return jwt.sign(
    {
      sub: email,
      iat: moment().unix(),
      exp: moment().add(50, 'minutes').unix(),
    },
    secret,
  );
};

export const getEmailFromToken = (token: string) => {
  try {
    // get email from token
    const tokenData = jwt.decode(token);
    if (!tokenData || !tokenData.sub) throw new Error('Invalid token');
    return tokenData.sub;
  } catch {
    throw new Error('Invalid token');
  }
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
