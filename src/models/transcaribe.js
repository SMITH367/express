const mongose = require("mongoose")


const Schema = mongose.Schema

const transcaribe = new Schema({
    numTarjeta:Number,
    saldo:Number,
})
module.exports = mongose.model("transcaribe",transcaribe)

