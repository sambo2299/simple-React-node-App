import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';
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
        images: [],
        info: [],
        modalView: '',
        file: null,
        userInfo : null
    };

    componentDidMount() {
        this.getImages();
        this.getUserInfo();
    }

    downloadFile = (img) => {
        //  window.open(`/api/downloadImage?image=${img}`,"_blank")
        axios.get(`api/downloadImage?image=${img}`)
            .then(r => {
                fileDownload(r.data, img);
                NotificationManager.success(`Downloaded file ${img} successfully!!!`, 'Download Complete', 3000);
                this.getImages();                
            }).catch(e => {
                NotificationManager.error(`Error in Downloading file ${img}!!!`, 'Error Download', 3000);

            });
    }

    deleteFile = (img) => {
        //  window.open(`/api/downloadImage?image=${img}`,"_blank")
        axios.post(`api/deleteImage?image=${img}`)
            .then(r => {                
                NotificationManager.success(`Image ${img}  deleted successfully!!!`,`Delete file`, 3000);
                this.getImages();                
            }).catch(e => {
                NotificationManager.error( `Error in deleting file ${img}!!!`, `Delete file`, 3000);

            });
    }

    getInfoFile = (img) => {
        axios.get('/api/getInfo?image=' + img)
            .then(res => {
                const tempInfo = [res.data];
                this.setState({ info: tempInfo, modalView: 'info' });
                NotificationManager.info(`Information loaded for  ${img} successfully!!!`, 'Information Fetched', 3000);
            })
            .catch(er => {
                NotificationManager.error(`Information fetched for file ${img} successfully!!!`, 'Error', 3000);
            })
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

    getUserInfo = () => {
        axios.get('/api/user/getUserData')
            .then(res => {                               
                this.setState({userInfo: res.data.userData});
            })
            .catch(er => {
                window.sessionStorage.removeItem('userInfo');                
            });
    }
   
    signOut = () => {
        axios.post('/api/user/logOut')
            .then(res => {
                NotificationManager.success(`sign out`, 'Signed out successfully', 3000);
                this.setState({userInfo: null})
            })
            .catch(er => {
                NotificationManager.error(`sign out`, 'Sign out error', 3000);
            });
    }

    signIn = (obj) => {        
        axios.post('/api/user/logIn', obj)
            .then(res => {
                NotificationManager.success(`signed In successfully!!!`, 'Sign In', 3000);
                this.getUserInfo();  
                this.closeModal();              
            })
            .catch(er => {
                NotificationManager.error(`sign In error`, 'Sign In', 3000);
            });
    }

    signUp = (obj) => {console.log(obj)
        if(obj.firstName && obj.lastName && obj.email && obj.password && obj.confirmPassword ) {
            if(obj.confirmPassword === obj.password) {
                axios.post('/api/user/signup',obj)
                .then(res => {
                    NotificationManager.success('sign up', 'Signed up successfully', 3000);
                    this.getUserInfo();
                    this.closeModal();
                })
                .catch(err => {
                    NotificationManager.error('sign Up error', 'sign Up' , 3000);
                });
            } else {
                NotificationManager.error('password missmatch!!!', 'sign Up' , 3000);
            }
        } else {
            NotificationManager.error('All parameters not provided', 'sign Up' , 3000);
        }
    }

    getImages = () => {
        axios.get('/api/getimages')
            .then(res => {
                if (res.data.length > 0) {
                    const imgs = { images: res.data };
                    this.setState({ images: imgs.images });
                }
            })
            .catch(er => {
                console.log("error", er);
            });
    }

    btnClickHandler = (img, evt) => {
        switch (evt) {
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
            case 'signOut':
                this.signOut();
                break;
            case 'signIn/signUp':
                this.signInModal();
                break;
            case 'delete':
                this.deleteFile(img);
                break;
            default:
                console.log('no evt');
        }
    }

    uploadModal = () => {
        this.setState({ modalView: 'upload' })
    }

    signInModal = () => {
        this.setState({ modalView: 'signIn/signUp' })
    }

    closeModal = () => {
        const info = [];
        this.setState({ info: info, modalView: '', file: '' });
    }    

    onFileChange = (e) => {
        e.preventDefault();
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar onBtnClick={this.btnClickHandler}  userInfo={this.state.userInfo}/>
                    <div className="container">
                        <Route exact={true} path={'/'}
                            render={() =>
                                <Images images={this.state.images} onBtnClick={this.btnClickHandler} userInfo={this.state.userInfo} />
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
                            onFileChange={this.onFileChange}
                            onSignIn={this.signIn}
                            onSignUp={this.signUp}
                        />
                    }
                    <NotificationContainer />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;