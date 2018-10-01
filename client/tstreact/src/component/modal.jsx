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
     

    state = {  }
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
                <h2 >Info</h2>
                <button className="btn-danger btn-sm" onClick={() => this.props.onBtnClick(null, 'closeModal')}>X</button>
                <div>
                    <ul className="list-group">
                    {    
                        Object.keys(this.props.info).map(i => <li key={i} className="list-group-item">{i}: {this.props.info[i]}</li>)
                    }

                    </ul>
                </div>
                </Modal>
            </div>
         );
    }
}


export default modal;