const express = require('express')
const deliveryMan = require("../models/deliveryMan")
const database = require("../database")
const router = express.Router()


router.post('/test', async (req, res) => {

    console.log(req.query)
    res.sendStatus(200)


})

router.post('/deliveryMan/payment/recharge', async (req, res) => {


    if (req.query != null) {

        if (req.query.x_response === "Rechazada") {
            const userEmail = req.query.x_customer_email
            const amount = req.query.x_amount

            try {

                const deliveryManValidateExist = await deliveryMan.findOne({
                    email: userEmail
                })

                if (deliveryManValidateExist !== null) {

                    console.log(deliveryManValidateExist, userEmail, amount)

                    const newBalance = amount += deliveryManValidateExist.balance;

                    const updateState = await deliveryMan.updateOne({
                        email: userEmail
                    }, {
                        $set: {
                            balance: newBalance
                        }
                    })

                    res.sendStatus(200)

                } else {
                    res.sendStatus(406)
                }

            } catch (err) {
                res.sendStatus(403)
            }

        }
    }

})


module.exports = router