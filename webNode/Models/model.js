const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    Item: {
        Name: {
            type: String,
            required: true,
        },
        Quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            default: Date.now,
        },
    }
})

const Payment = mongoose.model("Payment", PaymentSchema)

module.exports = Payment