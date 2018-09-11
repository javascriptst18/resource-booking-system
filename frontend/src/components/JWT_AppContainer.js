import React, { Component } from 'react';
import JWT_Authenticator from './JWT_Authenticator';

export default function JWT_AppContainer(JWT_protected_component) {
    const JWT_auth = new JWT_Authenticator('http://localhost:5000');

    return class JWT_wrapped_component extends Component {
        constructor() {
            super();
            this.state = {user: null}
        }

        componentWillMount() {
            if (!JWT_auth.loggedIn()) {this.props.history.replace('/login')}
            else {try {const profile = JWT_auth.getProfile();
                    this.setState({user: profile})
                }
                catch(err){JWT_auth.logout();
                this.props.history.replace('/login');
                }
            }
        }
        render() {
            if (this.state.user) {
                return (<JWT_protected_component history={this.props.history} user={this.state.user} />)
            }
            else {return null}
        }
    };
}
