require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const PORT = process.env.PORT;


connectDB();

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})