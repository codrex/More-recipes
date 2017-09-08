import express from 'express';
import logger from 'morgan';
import bodyPaser from 'body-parser';
import route from './routes/route';
import { sendSuccess } from './reply/reply';


import associate from './associations';

associate();


const app = express();
app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/api/v1/', route);
app.use('/', (req, res) => {
  sendSuccess(res, 200, 'message',
  'You are welcome to More-recipe, please Login or Signup to continue');
});

module.exports = app;
