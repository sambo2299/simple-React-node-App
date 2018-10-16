import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class footer extends Component {
    
    render() { 
        return (
            <footer className="page-footer font-small blue row">            
            <div className="col-md-6 footer-copyright text-center py-3">
                this is the copyright product of xyz
            </div>
            <div className="col-md-6">
                <ul className="list-unstyled">
                <li className="">                        
                    <Link to="/">Home</Link>
                </li>
                <li className="">
                    <Link to="/about">About</Link>
                </li>
                <li className="">
                    <Link to="/contact">Contact</Link>
                </li>
                </ul>
            </div>
            </footer>

        );
    }
}
 
export default footer;