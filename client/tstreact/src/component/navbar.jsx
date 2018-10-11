import React, { Component } from 'react';

class navBar extends Component {
    state = {}
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="navbar-brand float-left">Images</a>
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