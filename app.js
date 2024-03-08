//get any request and return with 'hi'
const express = require('express');
const { ussdController } = require('./index.js');
const app = express();
// const ussdController = require('./index.js');
app.get('/', (req, res) => {
    res.send('hi');
});
app.post(
    "/ussd",
    (req, res, next) => {
      next();
    },
    ussdController
  );

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
