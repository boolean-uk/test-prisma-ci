const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  if (!title || !runtimeMins) {
    return res
      .status(400)
      .json({ error: "both title and runtimeMins are required properties" });
  }
  const movie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: Number(runtimeMins),
    },
  });

  res.json({ data: movie });
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!movie) {
    return res.status(404).json({ error: `sorry movie id: ${id} not found` });
  }

  res.json({ data: movie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovie,
};
