const session = require('express-session');

module.exports = (app) => {
    app.use(session({
        secret: '53cr31c0d3',
        resave: false,
        saveUninitialized: true
    }));
};