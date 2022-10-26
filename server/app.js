const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRouter = require('./src/routes/registerRouter');
const loginRouter=require('./src/routes/loginRouter')
const adminRouter=require('./src/Routes/adminRouter')
const vesselRouter=require('./src/Routes/vessalRouter')
const productRouter=require('./src/Routes/productRouter')
const cartRouter=require('./src/Routes/cartRouter')
const orderRouter=require('./src/Routes/orderRouter')

const port = 5000;
 
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
app.use('/',loginRouter);
app.use('/register',registerRouter);
app.use('/admin',adminRouter);
app.use('/vessels',vesselRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);


app.listen(port,function(){
    console.log("server running on localhost: "+ port);
});