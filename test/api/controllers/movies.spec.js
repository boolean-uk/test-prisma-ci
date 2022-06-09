const supertest = require('supertest')
const app = require('../../../src/server.js')
const prisma = require('../../../src/utils/prisma.js')

describe('Movies Endpoint', () => {
  beforeEach(async () => {
    const screens = await Promise.all([
      { number: 1 },
      { number: 2 }
    ].map(async screen => await prisma.screen.create({data: screen})))

    await prisma.movie.create({
      data: {
        title: 'The Matrix',
        runtimeMins: 120,
        screenings: {
          create: [
            {
              startsAt: '2022-06-11T18:30:00.000Z',
              screenId: screens[0].id
            }
          ]
        }
      }
    })
    await prisma.movie.create({
      data: {
        title: 'Dodgeball',
        runtimeMins: 154,
        screenings: {
          create: [
            {
              startsAt: '2022-06-10T21:30:00.000Z',
              screenId: screens[1].id
            }
          ]
        }
      }
    })
  })
  afterEach(async () => {
    const deleteTables = [
      prisma.screening.deleteMany(),
      prisma.movie.deleteMany(),
      prisma.screen.deleteMany()
    ]
    await prisma.$transaction(deleteTables)
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

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
