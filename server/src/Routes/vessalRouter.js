const express = require('express');
const router = express.Router();
const register = require('../modals/registerdata')
const fisherman=require('../modals/fishermandata')
const vessels=require('../modals/vesseldata')
const vesselsrequest=require('../modals/vesselRequest')
const login=require('../modals/logindata')
var objectId = require('mongodb').ObjectID;

router.post('/add-vessals',((req,res)=>{
   console.log(req.body);
    var item = {
        vname:req.body.vname,
        desc:req.body.desc,
        vprice:req.body.vprice,
        image:req.body.image,
       
    }
    console.log(item);
    var products=vessels(item);
    products.save().then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Vessals added!'
        })
    })
}))

router.post('/update-vessels', (req, res) => {
    var item = {
        vname:req.body.vname,
        desc:req.body.desc,
        vprice:req.body.vprice,
        image:req.body.image,
       
    }
    console.log(item);
    vessels.updateOne({ _id: req.body._id }, { $set: item })
        .then(function () {           
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'vessel updated!',

                })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!",
                err:err
            })
        })
})

router.get('/view-vessels', (req, res) => {
    vessels.find()
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

router.get('/view-vessels/:id', (req, res) => {
    const id = req.params.id
    vessels.find({_id:id})
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

router.post('/request-vessels',((req,res)=>{
    console.log(req.body);
     var item = {
         login_id:req.body.id,
         vid:req.body.vid,
         status:0
        
     }
     console.log(item);
     var products=vesselsrequest(item);
     products.save().then(()=>{
         res.status(200).json({
             success:true,
             error:false,
             message:'Requests added!'
         })
     })
 }))

 router.delete('/delete-vessel/:id',((req,res)=>{
    const id=req.params.id
    console.log(id);
    vessels.deleteOne({_id:id}) .then(function () {
       
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'alert deleted!'
                })  

    })   
    .catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
}))
 
router.get('/view-vessels-requests', (req, res) => {
    vesselsrequest.aggregate([{
        $lookup: {
            from: 'fisherman_tbs',
            localField: 'login_id',
            foreignField: 'login_id',
            as: 'userdata'
        }
    },
    {
        $unwind:'$userdata'
    }, 
     {
        $lookup: {
            from: 'vessel_tbs',
            localField: 'vid',
            foreignField: '_id',
            as: 'vesseldata'
        }
    },
    {
        $unwind:'$vesseldata'
    }, 
    {
        $lookup: {
            from: 'login_tbs',
            localField: 'login_id',
            foreignField: '_id',
            as: 'logindata'
        }
    },
    {
        $unwind:'$logindata'
    }, 
])
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

router.get('/view-vessels-requests/:id', (req, res) => {
    const id=req.params.id
    console.log(id);
    vesselsrequest.aggregate([{
        $lookup: {
            from: 'fisherman_tbs',
            localField: 'login_id',
            foreignField: 'login_id',
            as: 'userdata'
        }
    },
    {
        $unwind:'$userdata'
    }, 
     {
        $lookup: {
            from: 'vessel_tbs',
            localField: 'vid',
            foreignField: '_id',
            as: 'vesseldata'
        }
    },
     
    {
        "$unwind": "$vesseldata"
    },
    {
        "$unwind": "$userdata"
    },
    {
        "$match": {
            "userdata.login_id": objectId(id)
        }
    },
])
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

 router.post('/approve-vessel-request/:id',(req,res)=>{
    const id=req.params.id
    console.log(id);
    vesselsrequest.updateOne(  { _id:id} , { $set: { status : 1  } } ).then((user)=>{
        console.log(user);
        res.status(200).json({
            success:true,
            error:false,
            message:"approved"
        })
        
    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

router.delete('/delete-vessel-request/:id',(req,res)=>{
    const id = req.params.id
    console.log(id);
    vesselsrequest.deleteOne({ _id: id }).then(function () {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Booking Canceled!'
        })
    })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
   
})
module.exports = router;