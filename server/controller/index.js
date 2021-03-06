const express = require('express');
const api = require('./api.controller');
const user = require('./user.controller');

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const isloggedIn = (req, res, next) => {
    if(req.session && req.session.sid) {
        next();
    } else {
        return res.status(500).send({
            error:true,
            message: 'user not logged in '
        });
    }
}

const isAdmin = (req, res, next) => {
    if(req.session.userRole === 'admin') {
        next();
    } else {
        return res.status(500).send({
            error:true,
            message: 'unauthorized operations'
        })
    }
}

// router.get('/msg',ga.sendEvent({ea: "get message", ec: "Api", el: "api test" }), api.getMsg);
router.get('/getimages', api.getImages);
router.get('/downloadImage', api.downloadImage);
router.get('/getInfo', api.getInfo);
router.post('/uploadfile',isloggedIn, api.uploadFile);
router.post('/deleteImage',isloggedIn, api.deleteImage);

router.get('/user/getUserData', isloggedIn, user.getUserData);
router.post('/user/login', user.userLogin);
router.post('/user/logout',isloggedIn, user.userLogout);
router.post('/user/signup', user.userSignup);
router.get('/user/listUsers',isloggedIn, isAdmin, user.getAllUsers);



module.exports = router;
