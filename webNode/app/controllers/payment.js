const mongoose = require("./../Database/index")

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
            required : true,
        },
    }
})

const Payment = mongoose.model("Payment", PaymentSchema)

module.exports = Payment