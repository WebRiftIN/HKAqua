import dotenv from 'dotenv';
import connectDB from './src/DB/index.js';
import {app} from './src/app.js'

dotenv.config({path: './.env'});

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`Error: ${error.message}`);
})