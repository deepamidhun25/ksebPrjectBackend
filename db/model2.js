const mongoose=require('mongoose')

const validator=require('validator')
const complaints =mongoose.model('complaints',{
    date:{
        type:String
    },

    consumer_ID:{
        type:String
    },
    name:{
        type:String

        
        
    },
   number:{
    type:String
   },
   mailId:{
    type:String
   },

   
   
   sectionOffice:{
    type:String
        
        
        
   },
   complaint:{
    type:String
   },

   reason:{
    type:String
   }
   
   

   

})


module.exports=complaints