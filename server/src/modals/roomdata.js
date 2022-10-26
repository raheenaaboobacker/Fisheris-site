const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/fisheriesapp?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')
const Schema=mongoose.Schema;
const roomSchema = new Schema({
     name:{ type: String, required: true },   
     place:{ type: String, required: true },   
     no_of_person:{ type: String, required: true },   
     mobile:{ type: String, required: true },   
     amount:{ type: String, required: true }, 
     image:{ type: String, required: true }  
})

var roomdata = mongoose.model('room_tb',roomSchema) 
module.exports=roomdata;