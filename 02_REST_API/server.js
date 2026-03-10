//server ko start krne ka kaam iska hota hai
const app = require('./src/app')
require('dotenv').config();

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})
