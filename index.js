'use strict';

const express = require('express');
const app = express();
const path = require('path');

const serveDirectory = path.resolve(__dirname, './dist');

app.use('/', express.static(serveDirectory));
/*eslint-disable no-console*/
app.listen(3005, () => console.log('Served on localhost:3005'));
