import dotEnv from 'dotenv';
dotEnv.config();

export const port = process.env.PORT;

export const connectionUrl: string = process.env?.MONGODB_URL || 'mongodb://localhost:27017';

export const jwt = {
  secret: process.env.JWT_SECRET,
  expirationDays: process.env.JWT_ACCESS_EXPIRATION_DAYS,
};
