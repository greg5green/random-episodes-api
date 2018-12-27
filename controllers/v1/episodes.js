const { flatten, sample, sortBy } = require('lodash');
const tvdb = require('../../services/tvdb');

function index(req, res) {
  _getAllEpisodes(req.params.seriesId)
    .then((episodes) => {
      const sortedEpisodes = sortBy(episodes, [
        'airedSeason',
        'airedEpisodeNumber'
      ]);

      res.send(sortedEpisodes);
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

function random(req, res) {
  _getAllEpisodes(req.params.seriesId)
    .then((episodes) => {
      const randomEpisode = sample(episodes);

      res.send(randomEpisode);
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

function _getAllEpisodes(seriesId) {
  return tvdb
    .get(`/series/${seriesId}/episodes`)
    .then((response) => {
      const nestedEpisodes = [response.data];

      for (let page = 2; page <= response.links.last; page++) {
        nestedEpisodes.push(
          tvdb
            .get(`/series/${seriesId}/episodes`, { params: { page } })
            .then(({ data }) => data)
        );
      }

      return Promise.all(nestedEpisodes);
    })
    .then((pages) => flatten(pages))
    .then((episodes) =>
      episodes.filter(
        (episode) => episode.airedSeason && episode.airedEpisodeNumber
      )
    );
}

module.exports = {
  index,
  random
};
