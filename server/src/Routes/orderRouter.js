const express = require('express');
const router = express.Router();
const checkAuth=require("../middleware/check-auth");
var ObjectId = require('mongodb').ObjectID;
const cart=require('../modals/cartData')
const order=require('../modals/orderData')


router.post('/orderbook',checkAuth,(req, res)=>{
    console.log(req.body);
   console.log(req.userData.userId);
   cart.find({login_id:req.userData.userId})
   .then(result=>{
    let cartdata=result
    console.log(cartdata);
    cart.deleteMany({login_id:req.userData.userId})
    .then(data=>{
        console.log(data);
           var item={
            login_id:req.userData.userId,
            productdata:cartdata,
            address:req.body,
            date : new Date().toDateString(),
            orderstatus:"ordered",


        }
        console.log(item);
        var books=order(item);
        books.save().then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'Ordered!'
            })
        })
    })
   })

})

router.get('/viewOrderItems', (req, res) => {
    
    order.aggregate([{
        $lookup: {
            from: 'product_tbs',
            localField: 'productdata.p_id',
            foreignField: '_id',
            as: 'orderBookData'
        }
    },
    {
        $unwind:'$orderBookData'
    },
    {
        $lookup: {
            from: 'register_tbs',
            localField: 'login_id',
            foreignField: 'login_id',
            as: 'userData'
          }
    },
    {
        $unwind:'$userData'
    },  
    
     ])
        .then(function (data) {
            console.log(data);
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Item Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        })

})
module.exports = router;