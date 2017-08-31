import express from 'express';
import logger from 'morgan';
import bodyPaser from 'body-parser';
import usersRouter from './routes/users-route';
import recipesRouter from './routes/recipes-route';

import associate from './associations';

associate();


const app = express();
app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/api/users/', usersRouter);
app.use('/api/recipes/', recipesRouter);


module.exports = app;
