const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body;

    if(!name || !phone || !email) {
      return res.status(400).json({error: 'one or more of the required fields are missing or invalid'})
    }
    try {
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
    }catch(err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2002') {
          res.status(409).json({error: 'the email provided is already in use'})
          return 
        }
      }
      res.status(500).json({error: err.message})
    }
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
