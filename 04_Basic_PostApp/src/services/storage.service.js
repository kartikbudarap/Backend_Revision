require("dotenv").config();

const ImageKit = require("@imagekit/nodejs");//is destructuring required here? no, we can directly use ImageKit to create an instance of the ImageKit class. The destructuring syntax is not necessary in this case, as we are not importing multiple named exports from the module. We can simply import the default export and use it to create an instance of the ImageKit class.

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Function to upload file to ImageKit
//need to refer to the documentation of imagekit to understand how to upload file using buffer and filename
const uploadFile = async (buffer, filename) => {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: filename,
  });
  return result;
};

module.exports = uploadFile;