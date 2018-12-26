const express = require('express');
const indexController = require('../controllers');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/test', indexController.index);

module.exports = router;
