const express = require("express");
const {
    getMovies,
    createMovie,
    getMovie
} = require('../controllers/movies');

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovie)

module.exports = router;
