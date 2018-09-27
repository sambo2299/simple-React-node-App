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
        }).catch(er => {
            console.log("error", er);
        })
    }
    
    btnClickHandler = (img, evt) => {        
        alert('button clicked' + img + ' for ' + evt)
    }
    
    downloadHandler = (img) => {

    }

    imageUrl = (image) => {
        
        return `http://localhost:4000/media/${image}`
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