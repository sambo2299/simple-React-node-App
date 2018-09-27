const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const vhost = require('vhost');
const {google} = require('googleapis');

require('./routes.js')(app);

app.use(express.static('../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views','../client/tstreact/public');

// app.use(vhost('myexample.com', ))

app.use(vhost('myexampletest.com',e => {}));
const server = app.listen('4000');
console.log('server listening @ 4000');