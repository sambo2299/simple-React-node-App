const userData = {
    fullName: 'Don Joe',
    address: 'some place',
    email: 'joe@don.email',
    token: '123don456joe',
    password: 'test123'
}

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../../lib/db').operations.user;
const passwordHelper = require('../../lib/helper').password;


const userLogin = (req, res) => {    
    if(req.body.email && req.body.password) {
        const query = {
            query : { email : req.body.email }, filter : { salt: 1, hashedPassword : 1 }
        }
        User.getOne(query).then(userInfo => {
            if (userInfo) {
                passwordHelper.comparePassword({ salt: userInfo.salt, chkPassword: req.body.password, orgPassword: userInfo.hashedPassword })
                .then(resp => { 
                    if(resp) {
                        req.session.sid = userInfo._id;    
                        return res.status(200).send({
                            success: true,
                            message: 'user Logged in successfully!!'
                        });
                    } else {
                        return res.status(500).send({
                            error:true,
                            message: "username and password did not match!!"            
                        });
                    }
                }).catch(err => {                    
                    return res.status(500).send({
                        error:true,
                        message: "username and password did not match!!"            
                    });
                });
            } else {
                return res.status(500).send({
                    error:true,
                    message: "username and password did not match!!"            
                });
            }
        }).catch(err => {
            return res.status(500).send({
                error:true,
                message: "username and password did not match!!"            
            });
        });
        
    } else {
        return res.status(500).send({
            error:true,
            message: "username and password not provided!!"            
        });
    }
}

const getUserData = (req, res) => {    
    if(req.session && req.session.sid) {
        const query = {
            query : {
                _id: ObjectId(req.session.sid)
            },
            filter : {
                email: 1,
                firstName: 1,
                lastName: 1,
                isActive: 1,
                _id: 0
            }
        }
        User.getOne(query)
        .then(resp => {
            if(resp) {
                return res.status(200).send({
                    success:true,
                    userData: {
                        fullName: `${resp.firstName} ${resp.lastName}`,                        
                        email: resp.email,
                        isActive: resp.isActive
                    }
                });
            } else {
                return res.status(500).send({
                    error: true,
                    message: 'user not logged in'
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                error: true,
                message: 'user not logged in'
            });
        })
       
    } else {
        return res.status(500).send({
            error: true,
            message: 'user not logged in'
        });
    }
}

const userLogout = (req, res) => {
    req.session.sid = undefined;
    return res.status(200).send({
        success:true,
        message: "user logged out"
    });
}

const userSignup = (req, res) => {
    if (req.body && req.body.firstName && req.body.lastName && req.body.email && req.body.password && req.body.confirmPassword ) {
         if (req.body.password === req.body.confirmPassword) {
            const query = {
                query : {
                    email: req.body.email
                },
                filter : {}
            }
            User.getOne(query).then(resp => {
                if(resp) {
                    return res.status(500).send({
                        error: true,
                        message: 'User already exists'
                    });
                } else {
                    passwordHelper.createSalt().then(salt => {
                        passwordHelper.createHashPwd({ salt: salt, password: req.body.password })
                        .then(hashpwd => {
                            const query = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                salt: salt,
                                hashedPassword: hashpwd
                            }
                            User.createOne(query).then(resp => {
                                req.session.sid = resp._id;
                                return res.status(200).send({
                                    success: true,
                                    message: "user created successfully!!!"
                                });
                            }).catch(err => {
                                return res.status(500).send({
                                    error:true,
                                    message: "internal server error unable to create user1"
                                });    
                            })
                        }).catch(err => { 
                            return res.status(500).send({
                                error:true,
                                message: "internal server error unable to create user2"
                            });
                        });                
                    }).catch(err => {
                        return res.status(500).send({
                            error:true,
                            message: "internal server error unable to create user3"
                        });
                    })
                }
            }).catch( err=> {
                return res.status(500).send({
                    error:true,
                    message: "internal server error unable to create user4"
                });
            });
         } else {
             return res.status(500).send({
                 error:true,
                 message: "password miss match"
             });
         }
    } else {
        return res.status(500).send({
            error:true,
            message: "One or more parameters is missing"
        });
    }
}

module.exports = {
    userLogin, userLogout, userSignup, getUserData
}