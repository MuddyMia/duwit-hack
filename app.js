const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('client'));

// with this we don't need to parse req
app.use(express.json());  
app.use(express.urlencoded());










module.exports = app;