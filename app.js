'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routing');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', router);

const DEFAULT_PORT = 8080;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
