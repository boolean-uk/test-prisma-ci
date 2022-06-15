const prisma = require("../src/utils/prisma");
const { createMovie } = require("./helpers/create-movie");

const setUpMovies = async () => {
  const screens = await Promise.all(
    [{ number: 1 }, { number: 2 }].map(
      async (screen) => await prisma.screen.create({ data: screen })
    )
  );

  const matrix = await createMovie('The Matrix', 136, screens[0])
  process.env.matrixID = matrix.id

  await createMovie('Dodgeball', 154, screens[1])
};

const deleteTables = () => {
  const deleteTables = [
    prisma.screening.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.screen.deleteMany(),
  ];
  return prisma.$transaction(deleteTables);
};

global.beforeEach(async () => {
  await setUpMovies();
});
global.afterEach(() => {
  return deleteTables();
});

global.afterAll(() => {
  return prisma.$disconnect();
});
