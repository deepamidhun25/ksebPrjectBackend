const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("....mongodb connected succesfully");
}).catch((error)=>{
    console.log("connected error"+error);
})