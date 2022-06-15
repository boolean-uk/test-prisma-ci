const prisma = require("../src/utils/prisma");

const deleteTables = () => {
  const deleteTables = [
    prisma.screening.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.screen.deleteMany(),
  ];
  return prisma.$transaction(deleteTables);
};


global.afterEach(() => {
  return deleteTables();
});

global.afterAll(() => {
  return prisma.$disconnect();
});
