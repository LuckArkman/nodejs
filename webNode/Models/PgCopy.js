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