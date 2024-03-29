import { Request, Response, NextFunction } from 'express';
import { UserModel } from './../models';
import { authService } from './../services';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password)))
      throw new Error('Incorrect email or password');

    const token = await authService.generateAuthToken(user._id);

    res.status(200).send({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const generateForgotPasswordToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // validate user
    const user = await UserModel.findOne(
      { email: req.params.email },
      { email: 1, password: 1 },
    );
    if (!user) throw new Error('Invalid user');

    const secret = authService.createSecretKeyFromPassword(user.password);
    const token = authService.createTokenForForgotPassword(user.email, secret); // this token can used onece coz onece the password is change then it will generate new secret to decrypt

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.params.token;
    const password = req.body.password;
    const email = authService.getEmailFromToken(token);

    // validate user
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Invalid email');

    const secret = authService.createSecretKeyFromPassword(user.password);
    authService.verifyToken(token, secret);
    user.password = password;
    await user.save();

    res.status(200).send('Password has been changed');
  } catch (error) {
    next(error);
  }
};
