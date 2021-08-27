const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:256
    },
    email:{
        type:String,
        min:8,
        max:256
    },
    password:{
        type:String,
        min:6,
        max:1024
    }
})

const UserModel = new mongoose.model("UserModel" , userSchema)
module.exports = UserModel