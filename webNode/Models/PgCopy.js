const sdk = require('api')('@devpagbank/v2.2#4m4i2mll5ix4rz');

sdk.criarPedido({
  customer: {
    name: 'Jose da Silva',
    email: 'email@test.com',
    tax_id: '12345678909',
    phones: [
      {
        country: 55,
        area: 62,
        number: 1234567890
      }
    ]
  },
  reference_id: 'ex-00001',
  items: [
    {
      name: 'nome do item',
      quantity: 1,
      unit_amount: 200
    }
  ]
}, {
  authorization: 'Bearer <token>',
  'x-idempotency-key': 'F9EBF20E8A3C4C48808379E0D1C4D803'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

const express = require("express")
const Payment = require('../models/payment')
const webhooks = require('node-webhooks');

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const paymentsList = await Payment.find({})
    return res.send({ data: paymentsList })
  } catch (err) {
    return res.status(400).send({ message: "payment list failed", error: err })
  }
})

router.post("/", async(req, res) => {
  try {
    const payment = await Payment.create(req.body)
    if(payment){
      const hooks = registerHooks();
      hooks.trigger('callback_hook', { msg: "new payment created", data: payment});
    }
    return res.send({ payment })
  } catch (err) {
    return res.status(400).send({ message: "payment create failed", error: err })
  }
})

const registerHooks = () => {
  return new webhooks({
    db: {
      'callback_hook': ['http://localhost:8005/webhook-client']
    }
  });
}

module.exports = (app) => app.use("/payments", router)