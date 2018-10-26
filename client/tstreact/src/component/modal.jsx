import React, { Component } from 'react';
import Modal from 'react-modal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class modal extends Component {

    state = {
        signIn : {
            email: '',
            password: ''
        },
        signUp : {}
    }   

    handleSignInInputChange = (ev) => {       
        let name = ev.target.name;
        let value = ev.target.value;
        let temp = {...this.state.signIn, [name]: value}
        this.setState({signIn: temp});        
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if(ev.target.name === 'signIn') {
            this.props.onSignIn(this.state.signIn);
        }        
    }

    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onUploadFile();
    }

    

    signUpForm = <div>
        <form>
            <div class="form-group">
                <label htmlFor="firstName">First Name&nbsp;:&nbsp;<input className="form-control" type="text" /></label>
            </div> 
            <div className="form-group">
                <label htmlFor="lastName">Last Name&nbsp;:&nbsp;<input className="form-control" type="text" /></label>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email&nbsp;:&nbsp;<input className="form-control" type="email" /></label>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password&nbsp;:&nbsp;<input className="form-control" type="password" /></label>            
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password&nbsp;:&nbsp;<input className="form-control" type="password" /></label>            
            </div>
            <div className="form-group">
                <button className="btn-sm btn-success m-2" type="submit">Sign Up</button>
                <button className="btn-sm btn-error m-2" onClick={() => this.props.onBtnClick(null, 'closeModal')}>cancel</button>            
            </div>
        </form>
    </div>;



signInForm = <div><form name="signIn" onSubmit={this.handleSubmit}>
    <div className="form-group">
        <label htmlFor="email">Email<input className="form-control" name="email"  type="text" onChange={this.handleSignInInputChange} /></label>
    </div>
    <div className="form-group">
        <label htmlFor="password">Password<input className="form-control" type="password" name="password" onChange={this.handleSignInInputChange} /></label>
    </div>
    <div className="form-group">
        <button className="btn-sm btn-success m-2" type="submit">Login</button>
        <button className="btn-sm btn-error m-2" onClick={() => this.props.onBtnClick(null, 'closeModal')}>cancel</button>
    </div>
    </form></div>;

    signInUpForm = () => {
       let content = <Tabs>
            <TabList >                
                <Tab><button className="btn-sm btn-primary mb-3">Sign In</button></Tab>
                <Tab><button className="btn-sm btn-primary mb-3">sign Up</button></Tab>                
            </TabList>

            <TabPanel>
                {this.signInForm}
            </TabPanel>
            <TabPanel>
                {this.signUpForm}
            </TabPanel>
        </Tabs>
        return content;    
    } 

    modalBody = () => {
        let bodyContent = '';
        switch (this.props.modalType) {
            case "info":
                bodyContent = <div className="row">{Object.keys(this.props.info).map(i =>
                    <li
                        key={i}
                        className="list-group-item col-md-6"
                    >
                        {i} : {
                            this.props.info[i]
                        }
                    </li>
                )}</div>;
                break;
            case "upload":
                bodyContent = <form onSubmit={this.onFormSubmit}>
                    <input type="file" className="form-control" onChange={this.props.onFileChange} />
                    <button type="submit" className="btn-sm btn-primary m-2" >Upload</button>
                </form>;
                break;
            case "signIn/signUp":
                bodyContent = this.signInUpForm();
                break;            
            default:
        }
        return bodyContent;
    }

    ModalTitle = () => {
        let title = '';
        switch (this.props.modalType) {
            case "info":
                title = <h4>Info</h4>
                break;
            case "upload":
                title = <h4>Upload File</h4>
                break;
            case "signIn/signUp":
                title = <h4>Sign Up / sign In User</h4>
                break;            
            default:
        }
        return title;

    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={true}
                    contentLabel="Info Block"
                    ariaHideApp={false}
                    style={this.customStyles}
                    tabindex="-1"
                >
                    <div>
                        <button className="btn-danger btn-sm float-right" onClick={() => this.props.onBtnClick(null, 'closeModal')}>X</button>
                        {this.ModalTitle(this.props)}
                    </div>
                    <div>
                        <ul className="list-group">
                            {
                                this.modalBody(this.props)
                                // Object.keys(this.props.info).map(i => <li key={i} className="list-group-item">{i}: {this.props.info[i]}</li>)
                            }

                        </ul>
                    </div>
                </Modal>
            </div>
        );
    }
}


export default modal;