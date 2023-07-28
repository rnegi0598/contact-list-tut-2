const express=require('express');
require('dotenv').config();
const bodyParser=require('body-parser');

const contactRouter=require('./routes/contact');
const userRouter=require('./routes/user');
const dbConnect=require('./config/db');
const errorHandler=require('./middlewares/errorHandler')
const validateToken=require('./middlewares/validateToken');

dbConnect();
const PORT=process.env.PORT|| 4000;
const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/contacts',validateToken,contactRouter);
app.use('/api/users',userRouter);
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})