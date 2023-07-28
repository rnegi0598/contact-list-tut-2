const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,{
        dbName:'contact-app'
    });
    console.log('db connected');
  } catch (err) {
    console.log(err);
  }
};



module.exports=dbConnect;