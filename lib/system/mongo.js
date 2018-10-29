const mongo = require('mongoose');
const config = require('../config.json');
module.exports = () => {
    mongo.connect(config.mongo_database);
    const db = mongo.connection;
    db.on('error', (e) => {
        console.log(e,'db connection error');
    });
    db.on('open', () => {
        console.log('mongodb opened');
        
    })
}