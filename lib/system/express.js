
const bodyParser = require('body-parser');
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));    
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', '../client/tstreact/public');
};