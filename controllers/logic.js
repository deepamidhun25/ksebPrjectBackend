
//import model
const users = require("../db/model");
const complaints = require("../db/model2");
const newcollections = require("../db/newConnectionModel");
const consumerbills = require("../db/billmodel")
const moment = require('moment');

//logic for admin to register userdata 
exports.userRegister = async (req, res) => {
  const { name, gender, address, mobile, email, sectionOffice, district } = req.body
  if (!name || !gender || !address || !mobile || !email || !sectionOffice || !district) {
    res.status(403).json("all inputs are required")
  }

  try {
    const preUser = await users.findOne({ mobile })
    if (preUser) {
      res.status(403).json("employee already exist")

    }
    else {
      // add value to user
      const newUser = new users({
        name, gender, address, mobile, email, sectionOffice, district
      })
      await newUser.save()
      // update newcollections as status as completed
      const filter = { mobile, name, email };
      const update = {
        $set: {
          status: 'issued', // Specify the field to update and its new value
        },
      };
      const result = await newcollections.updateOne(filter, update);


      res.status(200).json(newUser)


    }

  }
  catch (error) {
    res.status(401).json(error)
  }
}






//billaddition
exports.userBill = async (req, res) => {
  const { dateissued, mobile, billAmount, lastDate, endDate, unit } = req.body
  if (!dateissued || !mobile || !billAmount || !lastDate || !endDate) {
    res.status(403).json("all inputs are required")
  }

  

try {
    const preUser = await users.findOne({ mobile })
    if (preUser) {
      const name = preUser.name
      const consumerId = preUser._id
      const email = preUser.email

      const newUser = new consumerbills({
        consumerId, name, mobile, email, dateissued, billAmount,
        unitConsumed: unit,
        lastDate,
        endDate,
        status: "unpaid"


      })
      console.log(newUser);
      await newUser.save()

      preUser.bill.push(
        {
          dateissued,
          mobile,
          billAmount,
          lastDate,
          endDate,
          unit,
          status: "unpaid"
        }
      )
      preUser.save()
      console.log(preUser);
      res.status(200).json(newUser)
      


    }
    else {
      console.log("errr");
    }

  }
  catch (error) {
    res.status(401).json(error)
  }
}


// user login
exports.userlogin = async (req, res) => {
  const { Consumer_ID, mobile } = req.body
  console.log(Consumer_ID);
  console.log(mobile);

  if (!Consumer_ID || !mobile) {
    res.status(403).json("all inputs are required")
  }

  try {
    const preUser = await users.findOne({ _id: Consumer_ID, mobile })
    if (preUser) {
      res.status(200).json(preUser)
      console.log(preUser);
    }
    else {
      // console.log("user does not exist");
      res.status(403).json("employee doesnot exist")
    }

  }
  catch (error) {
    res.status(401).json(error)
  }
}
//paymentBill
exports.paymentBill = async (req,res)=>{
  const { Consumer_ID, dateIssue } = req.body

  try{
    const preUser = await  consumerbills.findOne({  consumerId: Consumer_ID,
      dateissued: dateIssue })
    if (preUser) {
      res.status(200).json(preUser)
      console.log(preUser);
    }
    else {
      // console.log("user does not exist");
      res.status(403).json("employee doesnot exist")
    }

  }
  catch{
    res.status(500).json({ message: 'Internal Server Error' });

  }
}

// //payment
exports.payment = async (req, res) => {
  const { Consumer_ID, dateIssue } = req.body
  console.log(Consumer_ID);
  console.log(dateIssue);

  try {

    const filter = {
      _id: Consumer_ID,
      "bill.status": "unpaid",// Filter by status "unpaid"
      "bill.dateissued": dateIssue

    };
    const update = {
      $set: {
        "bill.$.status": "paid" // Update the status field within the matching bill
      }
    };
    const result = await users.updateOne(filter, update);
    console.log(result.modifiedCount);

    // if(result){
    //   const name =result.name
    //   const dateissued=dateIssue
    //   const resultb = await   consumerbills.findOne({ consumerId: Consumer_ID,

    // }

    // udate data also in consumer bill

    const filterBill = {
      consumerId: Consumer_ID,
      dateissued: dateIssue,
      status:"unpaid"
    };

    const updateBill = {
      $set: {
        status:"paid" // Specify the field to update and its new value
      },
    };
    const resultBill = await consumerbills.updateOne(filterBill, updateBill);
    console.log(resultBill.modifiedCount);
      
    const preUser = await consumerbills.findOne({consumerId: Consumer_ID,
      dateissued: dateIssue})
    //return user data 
    if (result.modifiedCount == 1  && resultBill.modifiedCount > 0) {
      console.log('Bill status updated successfully');
      
      res.status(200).json(preUser)



    } else {
      console.log('No user or bill found with the specified criteria');
      res.status(404).json({ message: 'No user or bill found with the specified criteria' });
    }
//     res.status(200).json(resultBill)
//      console.log(result)
// console.log(resultBill);


  }
 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Complaint Registration
exports.complaintReg = async (req, res) => {
  const { consumer_ID, name, number, mailId, sectionOffice, complaint, reason } = req.body
  console.log(name);
   console.log(mailId)
  console.log(consumer_ID)
   console.log(number)
  console.log(sectionOffice)
  console.log(complaint)
  console.log(reason)


  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  
  

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate)
  try {

    const newCom = new complaints(
      {
        date: formattedDate,
        consumer_ID,
        name,
        number,
        mailId,
        sectionOffice,
        complaint,
        reason
      }
    )

    await newCom.save()
    res.status(200).json(newCom)
  }
  catch (error) {
    // console.error(error);
    res.status(401).json(error)
  }
}



//new connection request


exports.newConnection = async (req, res) => {
  const { name, email, gender, mobile, address } = req.body
  console.log(name);
  console.log(email)
  console.log(gender)
  console.log(mobile)
  console.log(address)


  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate)
  try {
    const preUser = await users.findOne({ mobile })
    if (preUser) {
      res.status(403).json("phoneNumber already exist")

    }
    else {


      const newcol = new newcollections(
        {
          date: formattedDate,
          name, email, gender,
          mobile,

          address, status: "pending"
        }
      )

      await newcol.save()
      res.status(200).json(newcol)
    }
    
  }
  catch (error) {
    // console.error(error);
    res.status(401).json(error)
  }
}



//get All newconnection detais
exports.getNewConnectionRequest = async(req,res)=>{

//access query parameter
const searchKey=req.query.search
const query={
  mobile:{$regex:searchKey,$options:"i"}
}

 try{ 
  const documents=await newcollections.find(query).sort({_id:-1})
  res.status(200).json(documents);

  
}
catch(err){
  res.status(500).json(err)
}


}

// get all complaints request
exports.getComplaintsRequest = async(req,res)=>{
  try{ 
   const documents=await complaints.find().sort({_id:-1})
   res.status(200).json(documents);
 
   
 }
 catch(err){
   res.status(500).json(err)
 }
 
 
 }

 // get disconnection details
 exports.getDisconnetionDate = async (req,res)=>{


  try
  {const {dateSelected}=req.body
  console.log(dateSelected)
  const filterBill = {
    endDate:dateSelected,
    status:"unpaid"
  };

// 







const databaseDates = await consumerbills.find(filterBill)
if(databaseDates)
{res.status(200).json(databaseDates)
console.log(databaseDates);}
else{
  res.status(403).json("Not  exist")
}
}
catch(err){

  res.status(500).json(err)
}




 }

 

