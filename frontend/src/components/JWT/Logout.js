import React, {Component} from 'react';
import JwtAuthenticator from './/JwtAuthenticator';
import JwtComponentWrapper from './JwtComponentWrapper';
import styles from 'styled-components';

const Auth = new JwtAuthenticator();

const LogoutButton = styles.button`
    height: 35px;
    color: #fff;
    background-color: #1abc9c;
    border: none;
    letter-spacing: 0.2rem;
    transition: 0.3s opacity ease;
    cursor: pointer;
    margin: 1rem;
}`;

class App extends Component {

    handleLogout() {
        Auth.logout();
        this.props.history.replace('/login');
    }

    render() {

        return (
            <div>
                    <LogoutButton type="button" onClick={this.handleLogout.bind(this)}>Logout</LogoutButton>
            </div>
        );
    }
}

export default JwtComponentWrapper(App);
