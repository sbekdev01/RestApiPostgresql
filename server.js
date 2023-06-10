const express = require('express')
require('dotenv').config()



const app=express();
app.use(express.json())

app.use('/api', require('./Routes/index'))

const PORT=process.env.PORT||3030
app.listen(PORT,()=>{
    console.log(`${PORT} =>oyoqqa turdi`);
})