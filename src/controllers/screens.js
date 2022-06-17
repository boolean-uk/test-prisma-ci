const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    res.status(400).json({ error: "number is required" });
    return;
  }
  const screen = await prisma.screen.create({
    data: {
      number: Number(number),
    },
  });

  res.json({ data: screen });
};

module.exports = {
  createScreen,
};
