require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT
const connectDB = require("./src/db/db")

connectDB();
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
