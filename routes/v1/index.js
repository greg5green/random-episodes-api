const express = require('express');
const series = require('./series');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/series', series);

module.exports = router;
