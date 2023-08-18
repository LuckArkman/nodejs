const session = require('express-session')
const express = require('express')
const bodyParse = require('body-parser')
const pagseguro_payment = require("pagseguro-payment")
const Payment = require('../app/controllers/payment')
const cookieParser = require("cookie-parser")
var WebHooks = require('node-webhooks')
const morgan = require('morgan');

const app = express();
const router = express.Router();

app.use(morgan("dev"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
require("../app/controllers/index")
const webhooks = require("node-webhooks");

const PORT = 4000;
const credentials = {
   "email": "email@test.com",
   "token": "F9EBF20E8A3C4C48808379E0D1C4D803",
   "auth": "https://ws.pagseguro.uol.com.br/",
   "preapprovals": "https://ws.pagseguro.uol.com.br/pre-approvals",
   "preapprovals_request": "https://ws.pagseguro.uol.com.br/pre-approvals/request",
   "preapprovals_payment": "https://ws.pagseguro.uol.com.br/pre-approvals/payment",
   "recurring_payment": "https://ws.pagseguro.uol.com.br/recurring-payment",
   "transactions": "https://ws.pagseguro.uol.com.br/v2/transactions",
   "session":" https://ws.pagseguro.uol.com.br/v2/sessions/"
};

const pagseguroPayment = new pagseguro_payment(credentials)
app.use(cookieParser());

app.use(session({
   secret: "password",
   saveUninitialized: true,
   resave: true
}));


class transation{
   pagamentoRequest(pedido) {
      InitRequest(pedido)

      async function InitRequest(pedido)
      {
         const payment = await Payment.create(pedido)
         try
         {
            if (payment)
            {
               const registerHooks = () => {
                  return new webhooks({
                     db: {
                        'callback_hook': ['http://localhost:8005/webhook-client']
                     }
                  })
               }
               const hooks = registerHooks();
               console.log({ msg: "new payment created", data: payment})
               hooks.trigger('callback_hook', { msg: "new payment created", data: payment});
            }

            //return res.send({payment})
         }
         catch (err)
         {
            console.log(err)
            //return res.status(400).send({ message: "payment create failed", error: err })
         }


      }
   }
}
module.exports = transation;




app.listen(PORT, () =>
    console.log(`Session running at ${PORT}`));