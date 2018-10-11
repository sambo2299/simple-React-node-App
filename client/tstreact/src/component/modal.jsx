import React, { Component } from 'react';
import Modal from 'react-modal';



class modal extends Component {

    customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',          
          
        }
      };

      onFormSubmit = (e) => {
          e.preventDefault();
          this.props.onUploadFile();
      }     

      modalBody = () => {
        let bodyContent =  '';                
        if(this.props.modalType === 'info') {
            bodyContent = Object.keys(this.props.info).map(i => 
                <li 
                    key={i} 
                    className="list-group-item"
                >
                {i} : {
                    this.props.info[i]
                }
                </li>
            );
        } else {
            bodyContent =  <form onSubmit={this.onFormSubmit}>
            <input type="file" className="form-control" onChange={this.props.onChange}/>
            <button type="submit" className="btn-sm btn-primary m-2" >Upload</button>
            </form>;
        }
        return bodyContent;
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
                <button className="btn-danger btn-sm float-right" onClick={() => this.props.onBtnClick(null, 'closeModal')}>X</button>
                <h2 >{this.props.modalType==='info' ? 'Info' : 'Upload File'} </h2>
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