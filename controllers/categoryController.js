const Category = require("../models/category");

// create category
const createCategory = async (req, res) => {
  const newCat = new Category(req.body);

  try {
    const savedCat = await newCat.save();
    return res.status(200).json(savedCat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// category list 
const getAllCategory = async (req, res) => {
    try {
        const cats = await Category.find();
       return res.status(200).json(cats);
      } catch (err) {
       return res.status(500).json(err);
      }
  };


module.exports = {
  createCategory,
  getAllCategory
};
