const Category = require("../models/Category");
const dotenv = require("dotenv");
dotenv.config();

const categoryController = {
  getListCategory: async (req, res) => {
    try {
      
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  insertMany: async (req, res) => {
    try {
      const Newcategory = await new Category({
        CateName: req.body.CateName,
        CateID: req.body.CateID,
      });
      const category = await Newcategory.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoryController;
