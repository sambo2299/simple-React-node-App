const crypto = require('crypto');

const createSalt = () => new Promise((resolve, reject) => {
    try {
        resolve(crypto.randomBytes(128).toString('base64'));
    } catch(ex) {
        reject('error');
    }
});

const createHashPwd = (obj) => new Promise((resolve, reject) => {
    try {
        const hmac = crypto.createHash('sha1',obj.salt);
        const password = hmac.update(obj.password).digest('hex');
        resolve(password);
    } catch(ex) { console.log(ex)
        reject('error');
    }
})

const comparePassword = (obj) => new Promise((resolve, reject) => {
    createHashPwd({salt: obj.salt,password: obj.chkPassword}).then(password => {
        if(password && password === obj.orgPassword) {
            resolve(true);
        } else {
            reject(true);
        }
    }).catch(ex => {
        reject(true);
    });
});

module.exports = { createSalt, createHashPwd, comparePassword }