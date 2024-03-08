//get any request and return with 'hi'
const express = require('express');
const { ussdController } = require('./index.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// const ussdController = require('./index.js');
app.get('/', (req, res) => {
    console.log('hi')
    res.send('hi');
});
app.post(
    "/",
    (req, res, next) => {
      next();
    },
    ussdController
  );

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
