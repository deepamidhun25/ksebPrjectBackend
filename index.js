//import 
require('dotenv').config()



const express=require('express')
const cors=require('cors')
const router = require('./routes/routes')  //import router

require('./db/connection')


//server creation
const server=express()

//connect frnt end
server.use(cors())
server.use(express.json())   //convert data from frntend json to js
server.use(router)   //server to use router




//port set
const port=4000 || process.env.port
server.listen(port,()=>{
    console.log(`server starts at ${port}`);
})