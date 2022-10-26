const mongoose=require('mongoose');
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/fisheriesapp?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')
const Schema=mongoose.Schema;

const roombookingSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    room_id:{type:Schema.Types.ObjectId,ref:"room_tb"} ,
    from_date:{ type: String, required: true } ,
    to_date:{ type: String, required: true } ,
    no_of_person:{ type: String, required: true } ,
    status:{ type: String, required: true } ,
   
},{strict:false});
var roombookingdata=mongoose.model('room_booking_tb',roombookingSchema);
module.exports=roombookingdata;