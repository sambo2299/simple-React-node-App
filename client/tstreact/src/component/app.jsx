import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Images from './images';

class App extends Component {
    state = {
        images : [],        
    };    
    
    componentDidMount () {
        axios.get('/api/getimages')
        .then(res => {            
            if (res.data.length > 0) {
                const imgs = {images : res.data };
                this.setState(imgs);
            }
        })
        .catch(er => {
            console.log("error", er);
        })
    }
    
    btnClickHandler = (img, evt) => {        
        switch(evt) {
            case 'download':
                this.downloadFile(img);
                break;
            case 'info':
                this.getInfoFile(img);
                break;
            default:
                console.log('no evt');
        }        
    }
    
    downloadFile = (img) => {
        axios.get(`/api/downloadImage?image=${img}`)
        .then(res => {
            console.log(res);
        })
        .catch(er => {
            console.log("error", er);
        });
        
    }

    getInfoFile = (img) => {
        axios.get('/api/getInfo?image='+img)
        .then(res => {
            console.log(res);
        })
        .catch(er => {
            console.log("error", er);
        })
    }

    render() { 
        return (
            <React.Fragment>
            <NavBar/>
            <div className="container">            
            <Images 
            images={this.state.images} 
            onBtnClick={this.btnClickHandler}            
            />
            </div>
            </React.Fragment>
        );
    }
}
 
export default App;