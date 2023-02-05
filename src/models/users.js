const mongose = require("mongoose")


const Schema = mongose.Schema

const user = new Schema({
    nombre:String,
    edad:Number,
    correo:String
})
module.exports = mongose.model("users",user)

