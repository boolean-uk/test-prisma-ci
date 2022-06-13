const prisma = require('../src/utils/prisma')

const setUpMovies = async () => {
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
}

const deleteTables = async () => {
    const deleteTables = [
        prisma.screening.deleteMany(),
        prisma.movie.deleteMany(),
        prisma.screen.deleteMany()
      ]
      await prisma.$transaction(deleteTables)
}

global.beforeEach(async () => {
    await setUpMovies()
})
global.afterEach(async () => {
  await deleteTables()
})

global.afterAll(async () => {
    await prisma.$disconnect()
})