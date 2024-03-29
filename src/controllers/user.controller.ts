import { Request, Response, NextFunction } from 'express';
import { UserModel } from './../models';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserModel.find(
      {},
      { firstName: 1, lastName: 1, email: 1 },
    ).lean();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserModel.findOne(
      { _id: req.params.userId },
      { firstName: 1, lastName: 1, email: 1 },
    ).lean();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
