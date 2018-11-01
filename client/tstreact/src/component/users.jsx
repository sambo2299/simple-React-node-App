import React, { Component } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class users extends Component {
    state = {
        usersList: []        
    }

    componentDidMount() {
        this.getAllUsers();
        
    }

    listUsers = () => {
        let lists = [];    
        this.state.usersList.map((usr, idx) => {        
            return lists.push(<tr key = {usr.email}>
            <th scope="row">{idx + 1}</th>
            <td>{usr.firstName}</td>
            <td>{usr.lastName}</td>
            <td>{usr.email}</td>
            <td>{usr.isActive ? 'Yes' : 'No'}</td>
            <td>{usr.userRole.toUpperCase()}</td>
            </tr>
        );
    });    
    return lists;
    }

    getAllUsers = () => {
        axios.get('/api/user/listUsers').then(resp => {
            if (resp.data.users && resp.data.users.length) {
                this.setState({
                    usersList: resp.data.users
                });
            }
        }).catch(err => {
            NotificationManager.error('unable to list users', 'list users', 3000);
        })
    }   

    userTbl = () => {
        return <table className="table">
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Active</th>
                <th scope="col">Role</th>
            </tr>
        </thead>
        <tbody>
            {this.listUsers()}
        </tbody>
        </table>
        }

    render() {
        return (
            <div className="col-md-12">
                <h4>Users</h4>
                
                {this.state.usersList.length > 0 && this.userTbl()}
                {this.state.usersList.length < 1 && <p>no users found</p> }
                <NotificationContainer />
            </div>
        );
    }
}

export default users;