const express = require('express');
const api = require('./api.controller');

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// router.get('/msg',ga.sendEvent({ea: "get message", ec: "Api", el: "api test" }), api.getMsg);
router.get('/getimages', api.getImages);
router.get('/downloadImage', api.downloadImage);
router.get('/getInfo', api.getInfo);

router.post('/uploadfile', api.uploadFile);

module.exports = router;
