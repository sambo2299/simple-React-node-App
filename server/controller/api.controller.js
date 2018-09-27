const fs = require('fs');
const config = require('../../lib/config.json');


const getImages = (req, res) => { console.log('fetching all images')
    fs.readdir(`${config.rootDir}/public/media`, (e, l) => {
        if(e) {
            console.log(e);                     
            res.status(500).send('error in getting image lists');
        } else {
            res.status(200).send(l);
        }
    })
}

const downloadImage = (req, res) => {
    fs.exists(`${config.rootDir}/public/media/${req.query.image}`, exists => {
        if(exists) {
            res.download(`${config.rootDir}/public/media/${req.query.image}`);
        } else {
            res.status(500).send('image do not exists');
        }
    })
}

const getInfo = (req, res) => {
    fs.stat(`${config.rootDir}/public/media/${req.query.image}`,(e,s) => {
        if(e) {
            res.status(500).send('unable to get info');            
        } else {
            res.status(200).send(s);
        }
    })
}

module.exports = {
 getImages, downloadImage, getInfo,
}