const Video = require("../models/Video");
const dotenv = require("dotenv");
dotenv.config();

const videoController = {
  createVideo: async (req, res) => {
    try {
      const newVideo = await new Video({
        title: req.body.title,
        videoID: req.body.videoID,
        channelTitle: req.body.channelTitle,
        publishedAt: req.body.publishedAt,
        viewCount: req.body.viewCount,
        likeCount: req.body.likeCount,
      });

      const response = await newVideo.save();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getList: async (req, res) => {
    try {
      const video = await Video.find();
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchVideoByName: async (req, res) => {
    try {
      const video = await Video.find({ title: { $regex: req.query.title} });
      if (!video) res.status(404).json(`Undefined ${req.query.title}`);
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchVideoByCateID: async (req, res) => {
    try {
      const video = await Video.find({ CateID: req.query.CateID });
      if (!video) res.status(404).json("Undefined video");
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = videoController;
