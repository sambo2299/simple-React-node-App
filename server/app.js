const express = require('express');
const http = require('http');
const path = require('path');
const vhost = require('vhost');
const {google} = require('googleapis');
const app = express();

app.use(express.static('../public'));
const config = require('../lib/system');
config.express(app);
config.session(app);
config.mongo();

require('./routes.js')(app);

// app.use(vhost('myexampletest.com',e => {}));
const server = app.listen('3001');
console.log('server listening @ 3001');
