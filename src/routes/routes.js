const express = require('express')
const deliveryMan = require("../models/deliveryMan")
const database = require("../database")
const router = express.Router()


router.post('/test', async (req, res) => {

    console.log(req.query)
    res.sendStatus(200)


})

router.post('/deliveryMan/payment/recharge', async (req, res) => {

    console.log(req.query)

    try {

        const payEmail = "Hola";
        const newBalance = 2;

        const updateState = await deliveryMan.updateOne({
            email: payEmail,
        }, {
            $set: {
                balance: newBalance
            }
        })

        res.send(updateState.acknowledged)
    } catch (err) {
        res.sendStatus(403)
    }

})


module.exports = router