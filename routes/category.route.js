const express = require("express");
const router = express.Router();
const { createCategory, getAllCategory } = require("../controllers/categoryController");

// create category
router.post("/", createCategory);
// category list 
router.get('/', getAllCategory)

module.exports = router;
