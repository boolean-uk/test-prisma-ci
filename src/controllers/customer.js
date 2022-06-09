const prisma = require('../utils/prisma');

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body;

    const createdCustomer = await prisma.customer.create({
        data: {
            name,
            contact: {
                create: {
                    phone,
                    email
                }
            }
        },
        include: {
            contact: true
        }
    })

    res.json({ data: createdCustomer });
}

const updateCustomer = async (req, res) => {
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      name: req.body.name
    }
  })

  res.json({ data: updatedCustomer });

}

module.exports = {
    createCustomer,
    updateCustomer
};
