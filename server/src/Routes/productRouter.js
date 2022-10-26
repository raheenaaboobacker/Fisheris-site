const express = require('express');
const router = express.Router();
const register = require('../modals/registerdata')
const fisherman=require('../modals/fishermandata')
const products=require('../modals/productdata')
const login=require('../modals/logindata')

router.post('/add-products',((req,res)=>{
   console.log(req.body);
    var item = {
        pname:req.body.pname,
        desc:req.body.desc,
        pprice:req.body.pprice,
        image:req.body.image,
       
    }
    console.log(item);
    var product=products(item);
    product.save().then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Product added!'
        })
    })
}))

router.get('/view-products/:id', (req, res) => {
    const id = req.params.id
    products.find({status:'work from home'})
        .then(function (data) {
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

router.post('/update-product', (req, res) => {
    var item = {
        pname:req.body.pname,
        desc:req.body.desc,
        pprice:req.body.pprice,
       
    }
    console.log(item);
    products.updateOne({ _id: req.body._id }, { $set: item })
        .then(function () {           
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Product updated!',

                })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!",
                err:err
            })
        })
})

router.delete('/delete-product/:id',((req,res)=>{
    const id=req.params.id
    console.log(id);
    products.deleteOne({_id:id}) .then(function () {
       
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Product deleted!'
                })

    })

   
    .catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
}))

router.get('/view-products', (req, res) => {
    products.find()
        .then(function (data) {
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