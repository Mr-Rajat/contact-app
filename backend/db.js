
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/icontactBook"
// console.log(process.env.URI);
exports.connect=()=>{
    mongoose.connect(
        uri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          family: 4
        }
      ).then(()=>{
        console.log("db connected")
      }).catch(err=>{
        console.log('connection failed')
        console.log(err)
        process.exit(1)
      })  
}