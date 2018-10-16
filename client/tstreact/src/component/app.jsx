import React, { Component } from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager,  NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import fileDownload from "js-file-download";

import NavBar from './navbar';
import Images from './images';
import ModalView from './modal';
import About from './aboutus';
import Contact from './contactus';
import Footer from './footer';

class App extends Component {
    state = {
        images:     [],  
        info:       [],   
        modalView:  '',   
        file:       null        
    };    
        
    componentDidMount () {
        this.getImages();
    }
    
    getImages = () => {
        axios.get('/api/getimages')
        .then(res => {            
            if (res.data.length > 0) {
                const imgs = {images : res.data };
                this.setState({images: imgs.images});
            }
        })
        .catch(er => {
            console.log("error", er);
        });        
    }

    btnClickHandler = (img, evt) => {        
        switch(evt) {
            case 'download':
                this.downloadFile(img);
                break;
            case 'upload':
                this.uploadModal();
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

    uploadModal = () => {
        this.setState({modalView: 'upload'})
    }
    
    closeModal = () => {
        const info = [];
        this.setState({info: info, modalView: '', file: ''});
    }

    downloadFile = (img) => {         
        //  window.open(`/api/downloadImage?image=${img}`,"_blank")
        axios.get(`api/downloadImage?image=${img}`)
        .then(r=> {            
            fileDownload(r.data, img);
            NotificationManager.success(`Downloaded file ${img} successfully!!!`, 'Download Complete', 3000);
        }).catch(e=> {
            NotificationManager.error(`Error in Downloading file ${img}!!!`, 'Error Download', 3000);

        });
        }
        
        getInfoFile = (img) => {
            axios.get('/api/getInfo?image='+img)
            .then(res => { 
                const tempInfo = [res.data];
                this.setState({info:tempInfo, modalView: 'info'});
                NotificationManager.info(`Information loaded for  ${img} successfully!!!`, 'Information Fetched', 3000);
            })
            .catch(er => {            
                NotificationManager.error(`Information fetched for file ${img} successfully!!!`, 'Error',  3000);
            })
        }
        
        onChange = (e) => {
            e.preventDefault();
            this.setState({file: e.target.files[0]});
        }
        
        uploadFile = (file) => {        
            const formData = new FormData();
            formData.append('file', this.state.file);       
            axios.post('/api/uploadfile', formData)
            .then(res => {      
                console.log(res)      
                NotificationManager.success(`File uploaded successfully!!!`, 'File upload', 3000);
                this.closeModal();
                this.getImages();
                
            })
            .catch(er => {                          
                NotificationManager.error('Unable to upload file!!!', 'File upload', 3000);
                this.closeModal();
        })
        .finally(r => {
            console.log(r);
        });
    }

    
    

    
    render() { 
        return (
            <Router>
            <React.Fragment>
            <NavBar onBtnClick={this.btnClickHandler} />
            <div className="container">
                <Route exact={true} path={'/'}
                  render ={() => 
                    <Images images={this.state.images} onBtnClick={this.btnClickHandler}/>                            
                  }   
                />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
            </div>
            <Footer />
            {
                this.state.modalView.length > 0 && 
                <ModalView 
                    onBtnClick={this.btnClickHandler} 
                    info={this.state.info[0]} 
                    modalType={this.state.modalView}
                    onUploadFile={this.uploadFile}
                    onChange={this.onChange}                   
                    />
            }
            <NotificationContainer />
            </React.Fragment>
            </Router>
        );
    }
}
 
export default App;