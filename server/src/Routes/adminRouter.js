const express = require('express');
const router = express.Router();
const register = require('../modals/registerdata')
const fisherman = require('../modals/fishermandata')
const checkAuth = require('../middleware/check-auth')
const troll = require('../modals/trollingdata')
const login = require('../modals/logindata')
const room = require('../modals/roomdata')
const booking = require('../modals/roomBookingData')
const insurance = require('../modals/insuranceData')
const multer = require("multer")
var objectId = require('mongodb').ObjectID;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single("file"), (req, res) => {
    return res.json("file uploaded")
})

router.post('/post-trollalert', checkAuth, ((req, res) => {
    console.log(req.body);
    var item = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        dist: req.body.dist,
        message: req.body.message,

    }
    console.log(item);
    var products = troll(item);
    products.save().then(() => {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Trolling alert posted!'
        })
    })
}))

router.get('/view-trollalert', (req, res) => {
    troll.find()
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

router.get('/view-trollalert/:id', (req, res) => {
    const id = req.params.id
    troll.find({ _id: id })
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

router.post('/update-trollalert', (req, res) => {
    var item = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        dist: req.body.dist,
        message: req.body.message,

    }
    console.log(item);
    troll.updateOne({ _id: req.body._id }, { $set: item })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'alert updated!',

            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!",
                err: err
            })
        })
})

router.delete('/delete-alert/:id', ((req, res) => {
    const id = req.params.id
    console.log(id);
    troll.deleteOne({ _id: id }).then(function () {
        login.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'alert deleted!'
                })
            })

    })


        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
}))

router.get('/view-users', ((req, res) => {
    login.aggregate([
        {
            $lookup:
            {
                from: 'register_tbs',
                localField: '_id',
                foreignField: 'login_id',

                as: "registerdetails"
            }
        },
        {
            $match:
            {
                role: 2
            }
        }
    ])
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
}))


router.get('/view-fisherman', ((req, res) => {
    login.aggregate([
        {
            $lookup:
            {
                from: 'fisherman_tbs',
                localField: '_id',
                foreignField: 'login_id',

                as: "registerdetails"
            }
        },
        {
            $match:
            {
                role: 3
            }
        }
    ])
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
}))


router.post('/approve-user/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    login.updateOne({ _id: id }, { $set: { status: 1 } }).then((user) => {
        console.log(user);
        res.status(200).json({
            success: true,
            error: false,
            message: "approved"
        })

    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})


router.delete('/delete-fisherman/:id', ((req, res) => {
    const id = req.params.id
    console.log(id);
    fisherman.deleteOne({ login_id: id }).then(function () {
        login.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Fisherman deleted!'
                })
            })

    })


        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
}))

router.delete('/delete-user/:id', ((req, res) => {
    const id = req.params.id
    console.log(id);
    register.deleteOne({ login_id: id }).then(function () {
        login.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Fisherman deleted!'
                })
            })

    })


        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
}))

router.post('/add-rooms', ((req, res) => {
    console.log(req.body);
    var item = {
        name: req.body.name,
        place: req.body.place,
        no_of_person: req.body.no_of_person,
        mobile: req.body.mobile,
        amount: req.body.amount,
        image:req.body.image

    }
    console.log(item);
    var products = room(item);
    products.save().then(() => {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Room added!'
        })
    })
}))

router.get('/view-rooms', ((req, res) => {
    room.find()
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
}))

router.get('/view-rooms/:id', ((req, res) => {
    const id = req.params.id
    room.find({ _id: id })
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
}))

router.post('/update-room', (req, res) => {
    var item = {
        name: req.body.name,
        place: req.body.place,
        no_of_person: req.body.no_of_person,
        amount: req.body.amount,

    }
    console.log(item);
    room.updateOne({ _id: req.body._id }, { $set: item })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'Room updated!',

            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!",
                err: err
            })
        })
})

router.delete('/delete-room/:id', ((req, res) => {
    const id = req.params.id
    console.log(id);
    room.deleteOne({ _id: id }).then(function () {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Room deleted!'
        })
    })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
}))

router.get('/view-fisherman/:id', ((req, res) => {
    const id=req.params.id
    login.aggregate([
        {
            $lookup:
            {
                from: 'fisherman_tbs',
                localField: '_id',
                foreignField: 'login_id',

                as: "registerdetails"
            }
        },
        {
            $match: {
                _id: objectId(id)
            }
        },
        {
            $match:
            {
                role: 3
            }
        }
    ])
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
}))
router.post('/apply-insurance', ((req, res) => {
    console.log(req.body);
    var item = {
        login_id: req.body.login_id,
        age:req.body.age,
        type: req.body.type,
        status: 0

    }
    console.log(item);
    var products = insurance(item);
    products.save().then(() => {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Request added!'
        })
    }).catch((err)=>{
        res.status(401).json({
            success: false,
            error: true,
            error: err
        })
    })
}))

router.get('/view-insurance/:id', ((req, res) => {
    const id = req.params.id
    insurance.find({ login_id: id })
        .then(data => {
            if(data==0){
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "No Item Found"
                })
            }else{
                res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
           
        }).catch((err)=>{
            res.status(401).json({
                success: false,
                error: true,
                data: err
            })
        })
}))

router.get('/view-insurance', ((req, res) => {
    const id = req.params.id
    insurance.aggregate([
        {
            $lookup:
            {
                from: 'fisherman_tbs',
                localField: 'login_id',
                foreignField: 'login_id',

                as: "registerdetails"
            }
        }, {     
             $unwind:"$registerdetails"         
        },
        {
            $lookup:
            {
                from: 'login_tbs',
                localField: 'login_id',
                foreignField: '_id',

                as: "logindetails"
            }
        }, {     
            $unwind:"$logindetails"         
       },
    ]).then(data => {
        console.log(data);
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        }).catch((err)=>{
            res.status(401).json({
                success: false,
                error: true,
                data: err
            })
        })
}))

router.post('/approve-insurance/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    insurance.updateOne({ _id: id }, { $set: { status: 1 } }).then((user) => {
        console.log(user);
        res.status(200).json({
            success: true,
            error: false,
            message: "Approved"
        })

    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})
router.post('/reject-insurance/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    insurance.updateOne({ _id: id }, { $set: { status: 2 } }).then((user) => {
        console.log(user);
        res.status(200).json({
            success: true,
            error: false,
            message: "Rejected"
        })

    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

router.post('/book-rooms', ((req, res) => {
    console.log(req.body);
    var item = {
        login_id: req.body.login_id,
        room_id: req.body.room_id,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        no_of_person: req.body.no_of_person,
        status: 0

    }
    console.log(item);
    var products = booking(item);
    products.save().then(() => {
        res.status(200).json({
            success: true,
            error: false,
            message: 'Room Booked!'
        })
    })
}))


router.get('/view-room-booking', ((req, res) => {
    booking.aggregate([
        {
          '$lookup': {
            'from': 'room_tbs', 
            'localField': 'room_id', 
            'foreignField': '_id', 
            'as': 'room'
          }
        }, {
          '$lookup': {
            'from': 'fisherman_tbs', 
            'localField': 'login_id', 
            'foreignField': 'login_id', 
            'as': 'user'
          }
        },
        {
            "$unwind": "$room"
        },
        {
            "$unwind": "$user"
        },
        {
            "$group": {
                "_id": "$_id",
                "from_date": { "$first": "$from_date" },
                "no_of_person": { "$first": "$no_of_person" },
                "status": { "$first": "$status" },
                "to_date": { "$first": "$to_date" },
                "room_name": { "$first": "$room.name" },
                "room_place": { "$first": "$room.place" },
                "user_email": { "$first": "$user.email" },
                "user_address": { "$first": "$user.address" },
                "user_mobile": { "$first": "$user.mobile" },
                "user_license": { "$first": "$user.license" },
                "user_login_id": { "$first": "$user.login_id" },
                
            }
        }
      ])
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        }).catch((err)=>{
            res.status(401).json({
                success: false,
                error: true,
                data: err
            })
        })
}))

router.get('/view-room-booking/:id', ((req, res) => {
    const id = req.params.id
    booking.aggregate([
        {
          '$lookup': {
            'from': 'room_tbs', 
            'localField': 'room_id', 
            'foreignField': '_id', 
            'as': 'room'
          }
        }, {
          '$lookup': {
            'from': 'fisherman_tbs', 
            'localField': 'login_id', 
            'foreignField': 'login_id', 
            'as': 'user'
          }
        },
        {
            "$unwind": "$room"
        },
        {
            "$unwind": "$user"
        },
        {
            "$match": {
                "user.login_id": objectId(id)
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "from_date": { "$first": "$from_date" },
                "no_of_person": { "$first": "$no_of_person" },
                "status": { "$first": "$status" },
                "to_date": { "$first": "$to_date" },
                "room_name": { "$first": "$room.name" },
                "room_place": { "$first": "$room.place" },
                "room_mobile": { "$first": "$room.mobile" },
                "user_email": { "$first": "$user.email" },
                "user_address": { "$first": "$user.address" },
                "user_mobile": { "$first": "$user.mobile" },
                "user_license": { "$first": "$user.license" },
                "user_login_id": { "$first": "$user.login_id" },
                
            }
        }
      ])
        .then(data => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        }).catch((err)=>{
            res.status(401).json({
                success: false,
                error: true,
                data: err
            })
        })
}))

router.post('/approve-room-booking/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    booking.updateOne({ _id: id }, { $set: { status: 1 } }).then((user) => {
        console.log(user);
        res.status(200).json({
            success: true,
            error: false,
            message: "Booking Approved"
        })

    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

router.delete('/delete-room-booking/:id', ((req, res) => {
    const id = req.params.id
    console.log(id);
    booking.deleteOne({ _id: id }).then(function () {
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
}))


module.exports = router;