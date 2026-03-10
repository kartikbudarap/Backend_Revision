const express = require("express");
const app = express();
const multer = require("multer");
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");
const cors = require("cors");

app.use(express.json()); //middle ware fo data
app.use(cors())

const upload = multer({ storage: multer.memoryStorage() });

//POST request
app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadFile(req.file.buffer, req.file.originalname);
    const post = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      image: result.url,
    });
    res.status(200).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Problem in creating post",
    });
  }
});

//GET request
app.get("/fetch-post", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error fetching the posts",
      error: err,
    });
  }
});

module.exports = app;
