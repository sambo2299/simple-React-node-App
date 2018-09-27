import React, { Component } from 'react';
import ImageBlock from './imgblock';

class images extends Component {    
    render() { 
        return (
            <div className="Row">
            { this.listImages()}
            </div>
        );
    }

    listImages() {        
        if (this.props.images.length === 0) return <div className="row"><p>No Images Found </p></div>
        return (
        <div className="row">
        {
            this.props.images.map((img, idx) => <ImageBlock  key={idx} image={img} onBtnClick={this.props.onBtnClick}/>)
        }
        </div>
        );
    }
}
 
export default images;