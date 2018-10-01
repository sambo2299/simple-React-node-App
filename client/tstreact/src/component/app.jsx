import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Images from './images';
import ModalView from './modal';

class App extends Component {
    state = {
        images : [],  
        info: [],      
    };    
    
    componentDidMount () {
        axios.get('/api/getimages')
        .then(res => {            
            if (res.data.length > 0) {
                const imgs = {images : res.data };
                this.setState({images: imgs.images});
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
            case 'closeModal':
                this.closeModal();
                break;
            default:
                console.log('no evt');
        }        
    }
    
    closeModal = () => {
        const info = [];
        this.setState({info: info});
    }

    downloadFile = (img) => {         
         window.open(`http://10.0.1.110:4000/api/downloadImage?image=${img}`,"_blank")
    }

    getInfoFile = (img) => {
        axios.get('/api/getInfo?image='+img)
        .then(res => { 
            const tempInfo = [res.data];
            this.setState({info:tempInfo});
        })
        .catch(er => {
            console.log("error", er);
        })
    }

    render() { 
        return (
            <React.Fragment>
            <NavBar/>
            <div className="container"><Images images={this.state.images} onBtnClick={this.btnClickHandler} /></div>
            {
                this.state.info.length > 0 && <ModalView onBtnClick={this.btnClickHandler} info={this.state.info[0]} />
            }
            </React.Fragment>
        );
    }
}
 
export default App;