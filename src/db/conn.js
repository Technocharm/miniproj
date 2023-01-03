const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/customer",{

}).then(()=>{
    console.log("success")
}).catch((e)=>{
    console.log("no connection")
})

