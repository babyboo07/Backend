const Category = require("../models/Category");
const dotenv = require("dotenv");
const Video = require("../models/Video");
dotenv.config();

const categoryController = {
  getListCategory: async (req, res) => {
    try {
      Category.aggregate([{
        $lookup: {
            from: "videos",
            localField: "CateID",
            foreignField: "CateID",
            as: "videos"
        },
    }]).exec(function(err, categories){
        const filter = categories.filter(item => item.videos.length);
        res.status(200).json(filter);
    })
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
