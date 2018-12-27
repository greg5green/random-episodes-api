const tvdb = require('../../services/tvdb');

function index(req, res) {
  if (!req.query.name) {
    return res.status(400).send({
      status: 400,
      message: 'A series name is required for searching'
    });
  }

  tvdb
    .get('/search/series', { params: { name: req.query.name } })
    .then(({ data }) => {
      res.send(data);
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        return res
          .status(404)
          .send({ status: 404, message: 'Series not found' });
      }

      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    });
}

function show(req, res) {
  tvdb
    .get(`/series/${req.params.seriesId}`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        return res
          .status(404)
          .send({ status: 404, message: 'Series not found' });
      }

      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    });
}

module.exports = {
  index,
  show
};
