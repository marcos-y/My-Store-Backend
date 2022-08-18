const express = require('express');
app = express();
bodyParser = require('body-parser');

// import mysql module
mysql = require('mysql'), 

// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystore'
})

const router = express.Router();
const users = require('./users/users');
const drones = require('./products/drones');
const smartphones = require('./products/smartphones')
const computers = require('./products/computers');
const newitems = require('./products/newitems');

/*USERS*/
router.use('/users',users);

/*PRODUCTS*/
router.use('/products',smartphones);
router.use('/products',drones);
router.use('/products',computers);
router.use('/products',newitems);

module.exports = router;
