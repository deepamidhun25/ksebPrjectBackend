const express=require('express')
//imprt logic function 
const { userRegister, userBill, userlogin, payment, complaintReg, newConnection, paymentUpdate, getNewConnectionRequest, getComplaintsRequest, getDisconnetionDate, paymentBill } = require('../controllers/logic')

//create object of router class
const router=new express.Router()

//routes for adminregister
router.post('/kseb/admin/register',userRegister)

//routes for admin bill addition
router.post('/kseb/admin/billAdd',userBill)



//routes for user to login
router.post('/kseb/admin/userlogin',userlogin)


//payment

router.post('/kseb/user/payment',payment)

//paymentBill
router.post('/kseb/user/paymentbill',paymentBill)

//register complaints
router.post('/kseb/user/complaints',complaintReg)

//register new connectins
router.post('/kseb/user/newConnectionRequest',newConnection)

// get new collections
router.get('/kseb/user/getNewconnectionrequest',getNewConnectionRequest)

//get complaints
router.get('/kseb/user/getComplaintrequest',getComplaintsRequest)

// display disconnection date
router.post('/kseb/user/disconnectiondisplay',getDisconnetionDate)



//export router
module.exports=router
