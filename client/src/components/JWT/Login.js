import React, {Component} from 'react';
import JwtAuthenticator from './JwtAuthenticator';
import styles from 'styled-components';

const LoginCard = styles.div`
    background-color: #1abc9c;
    border-radius: 15px;
    max-width: 300px;
    margin: 4rem auto;
    padding: 3rem;
`;
const Headline = styles.h1`
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
`;
const FormInput = styles.input`
    padding: 5px;
    margin-bottom: 2rem;
    height: 30px;
    width: 16rem;
    border: 1px solid grey;
    background-color: white;
    color: black;
`;
const SubmitButton = styles.input`
    height: 50px;
    color: #fff;
    background-color: black;
    border-radius: 10px;
    width: 70%;
    letter-spacing: 0.2rem;
    transition: 0.3s opacity ease;
    cursor: pointer;
    border: solid black 1px;
    padding: 1rem;
`;

class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.JWTauthInstance = new JwtAuthenticator();
    }

    componentWillMount() {if (this.JWTauthInstance.loggedIn()) this.props.history.replace('/')}

    render() {
        return (
            <div>
                <LoginCard>
                    <Headline>Login</Headline>
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput placeholder="email" name="email" type="text" onChange={this.handleChange}/>
                        <FormInput placeholder="Password" name="password" type="password" onChange={this.handleChange}/>
                        <SubmitButton value="SUBMIT" type="submit"/>
                    </form>
                </LoginCard>
            </div>
        )
    }
    handleFormSubmit(event) {event.preventDefault();
        this.JWTauthInstance.login(this.state.email, this.state.password).then(response => {this.props.history.replace('/')}).catch(error => {alert(error)})
    }

    handleChange(event) {this.setState({[event.target.name]: event.target.value})}
}

export default Login;
