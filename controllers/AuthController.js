const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const { generateToken } = require("../methods/authMethod");
dotenv.config();

const authController = {
  register: async (req, res) => {
    try {
      //check tai khoản
      const oldUser = await User.findOne({ email: { $regex: req.body.email } });
      if (oldUser) res.status(409).send("Tên tài khoản đã tồn tại.");
      //
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        googleID: req.body.googleID,
        imageURL: req.body.imageURL,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN;
    try {
      const user = await User.findOne({ email: { $regex: req.body.email } });
      if (!user) res.status(404).json("Wrong email");
      const validPasswd = await bcrypt.compare(req.body.password, user.password);
      if (!validPasswd) res.status(404).json("Invalid password");

      const dataForAccessToken = {
        email: user.email,
      };
      const accessToken = await generateToken(
        dataForAccessToken,
        accessTokenLife,
        accessTokenSecret
      );

      if (!accessToken) {
        return res.status(401).send("Đăng nhập không thành công, vui lòng thử lại.");
      }

      let refreshToken = randToken.generate(16);

      if (!user.refreshToken) {
        user.refreshToken = refreshToken;
        await user.save();
      } else {
        refreshToken = user.refreshToken;
      }
      return res.json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
