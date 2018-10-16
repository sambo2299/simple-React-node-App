import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class navBar extends Component {
    state = {}
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to="/" className="navbar-brand float-left">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="navbar-brand float-left">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="navbar-brand float-left">Contact</Link>
                        </li>

                        <li className="pull-right">
                            <button
                                className="btn-sm btn-success m-2"
                                onClick={() => this.props.onBtnClick(null, 'upload')}
                                modal={this.props.modal}
                            >Upload</button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default navBar;