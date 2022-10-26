const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const register = require('../modals/registerdata')
const login=require('../modals/logindata')
const fisherman=require('../modals/fishermandata')
const jwt=require('jsonwebtoken')


router.post('/login',(req, res)=>{
    console.log(req.body);
    let fetchedUser
    login.findOne({name: req.body.name})
    .then((user)=>{
        console.log("logindata=>",user)
        if(!user){
            return res.status(401).json({
                success:false,
                error:true,
                message:"User Not Found!"
            })
        }else{
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password)      
        }
        })
    .then(result=>{
        
        if(!result){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Please Check Password!"
            })
        }
        id = fetchedUser._id
        if(fetchedUser.status===0){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Request Pending!"
            })
        }else
        {
            if(fetchedUser.role===1){
                // console.log("role=>",fetchedUser.role);
                const token = jwt.sign(
                 {name:fetchedUser.name, userId:fetchedUser._id, userRole:fetchedUser.role},
                     "secret_this_should_be_longer",
                     { expiresIn: "4h" }
                 ) 
                 res.status(200).json({
                     success:true,
                     error:false,
                     token:token,
                     loginId: fetchedUser._id,
                     name: fetchedUser.name,
                     role:fetchedUser.role,
                 })
             }
            if(fetchedUser.role===2){
               // console.log("role=>",fetchedUser.role);
               const token = jwt.sign(
                {name:fetchedUser.name, userId:fetchedUser._id, userRole:fetchedUser.role},
                    "secret_this_should_be_longer",
                    { expiresIn: "4h" }
                ) 
                res.status(200).json({
                    success:true,
                    error:false,
                    token:token,
                    loginId: fetchedUser._id,
                    name: fetchedUser.name,
                    role:fetchedUser.role
                })
            }
            else if(fetchedUser.role===3){
               console.log("role not=>",fetchedUser.role);
               
                fisherman.findOne({login_id:id})
                .then((registerData)=>{  
                    
                    // let status = registerData.status
                    // console.log(status);
                    // if(status!=1){
                    //     return res.status(401).json({
                    //         success:false,
                    //         error:true,
                    //         message: "Waiting for admins approval",                        
                    //     })
                    // }
                    // else{
                        
                       
                        const token = jwt.sign(
                            {name:fetchedUser.name, userId:fetchedUser._id, userRole:fetchedUser.role},
                            "secret_this_should_be_longer",
                            { expiresIn: "1h" }
                        )            
                        res.status(200).json({
                            success:true,
                            error:false,
                            token:token,
                            loginId: fetchedUser._id,
                            name: fetchedUser.name,
                            licence:registerData.license,
                            role:fetchedUser.role
                        })
                    // }
                   
                })
            }
        }
       
        
 
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed",
            error: err
        })
    })
})

module.exports = router;