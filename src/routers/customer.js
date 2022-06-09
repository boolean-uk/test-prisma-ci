const express = require("express");
const {
    createCustomer,
    updateCustomer
} = require('../controllers/customer');

const router = express.Router();

router.post("/register", createCustomer);
router.patch("/:id", updateCustomer);

module.exports = router;
