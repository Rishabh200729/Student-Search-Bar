const express = require("express");
const router = express.Router();

// use the search students function in student controller to manage search request
const { searchStudents} = require("../controllers/studentController");

router.get("/search", searchStudents);

module.exports = router;
