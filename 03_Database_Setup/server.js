const app = require('./src/app');
const ConnectDB = require('./src/db/db');

require('dotenv').config();
const PORT = process.env.PORT;

ConnectDB();

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
})