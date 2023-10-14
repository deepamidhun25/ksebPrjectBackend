const mongoose=require('mongoose')

const validator=require('validator')
const consumerbills =mongoose.model('consumerbills',{
   
    consumerId:{
        type:String,
        required:true,
        trim:true
    },



    name:{
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
        
   },
   email:{
        type:String,
        required:true,
        trim:true,
       
        validator(value){
            if(!validator.isEmail(value)){
                throw Error("invalid email")
            }
        }
   },
   dateissued:{
    type:String,
        required:true,
        trim:true,
   },



billAmount:{
    type:String,
        required:true,
        trim:true,
},
unitConsumed:{
    type:String,
        required:true,
        trim:true,
},

lastDate:{
    type:String,
        required:true,
        trim:true,
},


endDate:{
    type:String,
    required:true,
    trim:true,
},

status:{
    type:String,
    required:true,
    trim:true,
}

})


module.exports=consumerbills