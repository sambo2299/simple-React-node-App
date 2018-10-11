const fs = require('fs-extra');
const config = require('../../lib/config.json');
const multer = require('multer');

const validMime = ['png', 'jpeg', 'jpg'];

const storage = multer.diskStorage({
    destination: `${config.rootDir}/public/media`,
    filename(req, file, cb) {
        fs.ensureDirSync(`${config.rootDir}/public/media`);
        fs.exists(`${config.rootDir}/public/media/${file.originalname}`, (exists) =>{
            if(exists) {
                cb('file already exists', null);
            } else {
                if(validMime.indexOf(file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase()) > -1 ){            
                    cb(null, `${file.originalname}`);
                } else {            
                    cb('invalid file', null);
                }
            }
        });
    },
  });



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

const upload = multer({storage:storage}).single('file');

const uploadFile = (req, res) => {
    upload(req, res, (e) => {         
        if (!req.file) {
            return res.status(500).send(e || 'file not uploaded!!!');
        }        
        res.status(200).send('file uploaded successfully!!!')        
    });
}

module.exports = {
 getImages, downloadImage, getInfo, uploadFile
}