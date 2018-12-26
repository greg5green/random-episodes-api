const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');

describe('index', function() {
  it('responds with the test object', function() {
    return request(app)
      .get('/v1/test')
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({
          message: 'test'
        });
      });
  });
});
