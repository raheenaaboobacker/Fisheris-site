const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const register = require('../modals/registerdata')
const login=require('../modals/logindata')
const fisherman=require("../modals/fishermandata")
const feed=require("../modals/feedbackdata")

router.post('/user-register', (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'password hashing error'
            })
        }
        let logindata = {
            name: req.body.name,
            password: hashedPass,
            role:  req.body.role,
            status:0
        }
        console.log(logindata);
        login.findOne({ name: req.body.name })
            .then(name => {
                if (name) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'name already exist!'
                    })
                }
                else {

                    if(req.body.role==="2"){
                        var item = login(logindata)
                    item.save()
                        .then((details) => { 
                            var id = details._id
                            let registerdata = {
                                login_id: id,
                                email: req.body.email,
                                mobile: req.body.mobile,
                                address: req.body.address,
                                
                                
                            }
                            register.findOne({ mobile: registerdata.mobile })
                                .then((mobile) => {
                                    if (!mobile) {
                                        var register_item = register(registerdata)
                                        register_item.save()
                                            .then(() => {
                                                res.status(200).json({
                                                    success: true,
                                                    error: false,
                                                    message: 'registration success'
                                                })
                                            })

                                    }
                                    else {
                                        console.log(id)
                                        login.deleteOne({ _id: id })
                                            .then(() => {

                                                res.status(401).json({
                                                    success: false,
                                                    error: true,
                                                    message: 'Mobile number is already registered with us'
                                                })


                                            })

                                    }
                                })


                        })

                    }else{
                        var item = login(logindata)
                        item.save()
                            .then(() => {
                                login.findOne({ name: logindata.name })
                                .then(function (details) {
                                    var id = details._id
                                    let registerdata = {
                                        login_id: id,
                                        email: req.body.email,
                                        mobile: req.body.mobile,
                                        address: req.body.address,
                                        location:req.body.location , 
                                        license:req.body.license,
                                        monthlyinc:req.body.monthlyinc
                                      
                                    }
                                    fisherman.findOne({ mobile: registerdata.mobile })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                var register_item = fisherman(registerdata)
                                                register_item.save()
                                                    .then(() => {
                                                        res.status(200).json({
                                                            success: true,
                                                            error: false,
                                                            message: 'registration success'
                                                        })
                                                    })

                                            }
                                            else {
                                                console.log(id)
                                                login.deleteOne({ _id: id })
                                                    .then(() => {

                                                        res.status(401).json({
                                                            success: false,
                                                            error: true,
                                                            message: 'Mobile number is already registered with us'
                                                        })


                                                    })

                                            }
                                        })


                                })

                        })  
                    }
                }

            })
    })

})

router.post('/add-feedback',((req,res)=>{
    console.log(req.body);
     var item = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        message:req.body.message,
        
     }
     console.log(item);
     var product=feed(item);
     product.save().then(()=>{
         res.status(200).json({
             success:true,
             error:false,
             message:'Feedback added!'
         })
     })
 }))

 router.get('/view-feed', (req, res) => {
    feed.find()
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