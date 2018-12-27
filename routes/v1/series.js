const express = require('express');
const episodes = require('../../controllers/v1/episodes');
const series = require('../../controllers/v1/series');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', series.index);
router.get('/:seriesId', series.show);
router.get('/:seriesId/episodes', episodes.index);
router.get('/:seriesId/episodes/random', episodes.random);

module.exports = router;
