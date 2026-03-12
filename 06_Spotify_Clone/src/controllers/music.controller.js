const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

const createMusic = async (req, res) => {
  //isko protected banana hai
  //which mean sirf artist hi music ko create kar sakta hai
  //baki users ko 403 error dikhana hai
  //hum register karte waqt id and role ko token me rakh rhe the
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token.process.env.JWT_SECRET);
    if (decoded.role != "artist") {
      return res.status(403).json({
        message: "You dont have access to create music",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const { title } = req.body;
  const file = req.file;
  const result = await uploadFile(file.buffer.toString('base64'))
  const music = await musicModel.create({
    uri:result.uri,
    title,
    artist:decoded.id
  })
  res.status(201).json({
    message: "Music created successfully",
    music:{
        id: music._id,
        title: music.title,
        uri: music.uri,
        artist: music.artist
    }
  })
};

module.exports = { createMusic };