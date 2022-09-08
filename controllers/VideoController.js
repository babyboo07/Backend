const Video = require("../models/Video");
const dotenv = require("dotenv");
dotenv.config();

const videoController = {
  createVideo: async (req, res) => {
    try {
      const video = req.body.video;
      console.log(video.createdBy);
      const newVideo = await new Video({
        title: video.title,
        videoID: video.videoID,
        channelTitle: video.channelTitle,
        publishedAt: video.publishedAt,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        CateID: video.CateID,
        createdBy: {
          userId : video.createdBy.userId,
          imageUrl: video.createdBy.imageURL,
          username: video.createdBy.username,
      }
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
      const video = await Video.find({ title: { $regex: new RegExp(req.query.title, "i") } });
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
