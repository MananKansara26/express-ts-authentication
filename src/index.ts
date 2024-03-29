import express, { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import router from './routes';
import * as config  from './config/config';
import logger from './config/logger';

const app = express();
const PORT = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', router);

app.use((req: Request, res: Response) => {
  return res.send('Invalid route');
});

// if we remove next then express can not recognize it as error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
}); 

mongoose.connect(config.connectionUrl).then(() => {
  logger.info("Connected to database")
  app.listen(() => {
    logger.info(`Server is listening on port ${PORT}`);
  });
});
