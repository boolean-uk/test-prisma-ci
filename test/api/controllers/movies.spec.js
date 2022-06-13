const supertest = require('supertest')
const app = require('../../../src/server.js')

describe('Movies Endpoint', () => {
  describe('GET /movies', () => {
    it('returns a list of movies', async () => {
      const response = await supertest(app).get('/movies')
      expect(response.status).toEqual(200)
      expect(response.body.data).not.toEqual(undefined)
      expect(response.body.data.length).toEqual(2)

      const [movie1, movie2] = response.body.data
      expect(movie1.title).toEqual('The Matrix')
      expect(movie2.title).toEqual('Dodgeball')
    })
  })
})
