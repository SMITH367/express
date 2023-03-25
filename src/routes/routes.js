const express = require('express')
const deliveryMan = require("../models/deliveryMan")
const transcaribe = require("../models/transcaribe.js")
const database = require("../database")
const router = express.Router()


router.post('/test', async (req, res) => {

    console.log(req.query)
    res.sendStatus(200)


})

router.post('/transcaribe/recarga/:numeroTarj/:saldo', async (req, res) => {

    const getTarjeta = await transcaribe.findOne({
        numTarjeta: req.params.numeroTarj
    })

    console.log(getTarjeta)
    if (getTarjeta !== null) {
        if (req.params.numeroTarj == getTarjeta.numTarjeta) {

            
            const newSaldo = getTarjeta.saldo + parseInt(req.params.saldo)
            
            const recarga = await transcaribe.updateOne({
                numTarjeta: req.params.numeroTarj
            }, {saldo:newSaldo})
          

            if(recarga!== null){
                res.send({
                    "transaccion":"aprobada",
                    "nuevoSaldo":newSaldo
                })
            }
            
        } else {
            res.sendStatus(401)
        }
    }




})

router.post('/transcaribe/registro/:numTarjeta', async (req, res) => {

    console.log(req.params.numTarjeta)
    const newTarjeta = {
        numTarjeta:req.params.numTarjeta,
        saldo:0
    }
    const addTarjeta = new transcaribe(newTarjeta)
    await addTarjeta.save()
    console.log(addTarjeta)
    res.sendStatus(200)


})







router.post('/deliveryMan/payment/recharge', async (req, res) => {


    if (req.query != null) {

        if (req.query.x_response === "Aprobada") {
            const userEmail = req.query.x_customer_email
            const amount = req.query.x_amount

            try {

                const deliveryManValidateExist = await deliveryMan.findOne({
                    email: userEmail
                })

                if (deliveryManValidateExist !== null) {

                    console.log(deliveryManValidateExist, userEmail, amount)

                    let newBalance = parseInt(amount) + parseInt(deliveryManValidateExist.balance)
                    console.log(newBalance)

                    const updateState = await deliveryMan.updateOne({
                        email: userEmail
                    }, {
                        $set: {
                            balance: newBalance
                        }
                    })

                    res.sendStatus(200)
                } else {
                    //Send email to the user
                    res.sendStatus(406)
                }
            } catch (err) {
                res.sendStatus(403)
            }

        }
    }

})


module.exports = router