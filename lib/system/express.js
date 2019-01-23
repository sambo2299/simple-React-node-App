
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));    
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(config.rootDir,'client/tstreact/public'));
};
