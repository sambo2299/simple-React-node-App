const mongoose = require('mongoose');
let User = mongoose.model('user');
// let User = require('../../db').schema.user;
// const User = Schema.user;
const getOne = (query) => new Promise((resolve, reject) => {
    User.findOne(query.query, query.filter)
    .then(result => { 
        resolve(result);
    })
    .catch(err => {
        reject(err);
    });
});

const createOne = (query) => new Promise((resolve, reject) => {
    User.create(query)
    .then(resp => {
        resolve(resp);
    })
    .catch(err => {
        reject(err);
    })
});

module.exports = {
    getOne, createOne
}