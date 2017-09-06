import express from 'express';
import logger from 'morgan';
import bodyPaser from 'body-parser';
import route from './routes/route';

import associate from './associations';

associate();


const app = express();
app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/api/v1/', route);

module.exports = app;
