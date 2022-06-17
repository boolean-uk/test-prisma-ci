const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  if (!screeningId || !customerId) {
    res.status(400).json({
      error:
        "both screeningId and customerId are required and should point to existing resources",
    });
    return;
  }
  try {
    const ticket = await prisma.ticket.create({
      data: {
        screeningId: Number(screeningId),
        customerId: Number(customerId),
      },
      include: {
        customer: true,
        screening: true,
      },
    });

    res.json({ data: ticket });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        res.status(400).json({ error: "both screeningId and customerId are required and should point to existing resources" });
        return;
      }
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTicket,
};
