require("dotenv").config();
const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async () => {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: "music_" + Data.now(),
    folfer: "yt-complete-backend/music",
  });
  return result;
};

module.exports = {uploadFile}
//ye file music ko imagekit pe upload karne ke liye hai