const express = require("express")
const app = express()
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const authRoute = require("./route/auth")

dotenv.config()

mongoose.connect( process.env.DB_CONNECTION , {useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>console.log("db connected"))
.catch(err=>console.log(`connection error ${err}`))

app.use(express.json())

app.use("/api/user" , authRoute)


app.listen(8000 , function () {
    console.log("server up at port number 8000")
})