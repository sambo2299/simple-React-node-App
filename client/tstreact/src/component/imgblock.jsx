import React, { Component } from 'react';

class  imgblock extends Component {    
    render() { 
        return (
                <div className="col-md-3">
                    <img src={`/media/${this.props.image}`}  alt="" className="img-thumbnail rounded"/>                                
                    <button onClick={() => this.props.onBtnClick(this.props.image, 'download')} className="btn-primary btn-sm  m-2">Download</button>
                    <button onClick={() => this.props.onBtnClick(this.props.image, 'info')} className="btn-primary btn-sm  m-2">Get Info</button>
                </div>             
            
          );
    }
}
 
export default imgblock;