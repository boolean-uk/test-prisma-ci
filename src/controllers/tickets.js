const prisma = require('../utils/prisma');

const createTicket = async (req, res)=> {
    const ticket = await prisma.ticket.create({
        data: {
            screeningId: Number(req.body.screeningId),
            customerId: Number(req.body.customerId)
        }
    })

    res.json({ data: ticket });
}

module.exports = {
    createTicket
};
