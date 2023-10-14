const mongoose=require('mongoose')

const validator=require('validator')
const newcollections = mongoose.model('newcollections',{

    date:{
        type:String
    },

    name:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
   address:{
        type:String,
        required:true,
        trim:true
   },
   mobile:{
    type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:13,
        unique:true
   },
   email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw Error("invalid email")
            }
        }
   },
   status:{
    type:String,
 
    trim:true,
}
  

})


module.exports=newcollections

