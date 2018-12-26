const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const v1 = require('./api/v1/routes');

const app = express();

app.use(
  logger(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', v1);

module.exports = app;
