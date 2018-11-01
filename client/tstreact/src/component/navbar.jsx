import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class navBar extends Component {
    state = {}

    Rightbuttons = {
        marginLeft: '40%'
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="col-md-6">
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
                            {this.props.userInfo && this.props.userInfo.userRole === 'admin' && <li className="nav-item"><Link to="/users" className="navbar-brand float-left">Users</Link></li>}
                        </ul>
                    </div>
                    <div className="col-md-6" style={this.Rightbuttons}>
                        <ul className="navbar-nav" >
                            <li className="">
                                {this.props.userInfo && <button
                                    className="btn-sm btn-success m-2"
                                    onClick={() => this.props.onBtnClick(null, 'upload')}
                                    modal={this.props.modal}
                                >Upload</button>}
                            </li>
                            <li className="">
                                {this.props.userInfo
                                    ?
                                    <div>
                                        {this.props.userInfo.fullName} <br />
                                        <a onClick={() => this.props.onBtnClick(null, 'signOut')}>signOut</a>
                                    </div>
                                    :
                                    <button
                                        className="btn-sm btn-success m-2"
                                        onClick={() => this.props.onBtnClick(null, 'signIn/signUp')}
                                        modal={this.props.modal}>
                                        {'signIn/signUp'}
                                    </button>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default navBar;