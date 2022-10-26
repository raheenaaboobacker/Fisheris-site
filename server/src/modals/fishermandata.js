const mongoose=require('mongoose');
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/fisheriesapp?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')
const Schema=mongoose.Schema;

const fishermanSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    email:{ type: String, required: true } ,
    mobile:{ type: String, required: true } ,
    address:{ type: String, required: true } ,
    location:{ type: String, required: true } , 
    license:{ type: String, required: true } ,
    monthlyinc:{ type: String, required: true } ,
   
},{strict:false});
var fishermandata=mongoose.model('fisherman_tb',fishermanSchema);
module.exports=fishermandata;