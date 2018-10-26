import React, { Component } from 'react';

class  imgblock extends Component {    
    render() { 
        return (
                <div className="col-md-3">
                    <img src={`/media/${this.props.image}`}  alt="" className="img-sm img-thumbnail m-2"/>            
                    <p className="m-2 "><strong>{this.props.image}</strong></p>                                        
                    <button onClick={() => this.props.onBtnClick('download')} className="btn-primary btn-sm  m-2">Download</button>
                    <button onClick={() => this.props.onBtnClick('info')} className="btn-info btn-sm  m-2">Get Info</button>                    
                    {this.props.userInfo && <button onClick={() => this.props.onBtnClick('delete')} className="btn-warning btn-sm m-2">Delete</button>}                    
                </div>             
            
          );
    }
}
 
export default imgblock;