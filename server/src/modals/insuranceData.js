const mongoose=require('mongoose');
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/fisheriesapp?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority')
const Schema=mongoose.Schema;

const insuranceSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    // name:{ type: String, required: true } ,
    age:{ type: String, required: true } ,
    type:{ type: String, required: true } ,
    status:{ type: String, required: true } ,
    
},{strict:false});
var insurancedata=mongoose.model('insurance_tb',insuranceSchema);
module.exports=insurancedata;