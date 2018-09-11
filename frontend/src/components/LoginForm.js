import React, { Component } from 'react';
import JWT_Authenticator from './JWT_Authenticator';
import styles from 'styled-components';

const Wrapper = styles.div`margin: 5rem auto; text-align: center;`;
const H1 = styles.h1`font-size: 2rem;`;
const Formbox = styles.form`padding: 2rem; width: 300px; text-align: center; margin: 2rem auto; border: solid black 1px;`;
const Input = styles.input`margin: 1rem;`;
const Submit = styles.input`margin: 1rem; background-color: black; color: white; border: solid black 1px; padding: 1rem;`

class LoginForm extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.JWT_auth = new JWT_Authenticator();
    }
    componentWillMount(){
        if(this.JWT_auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (

                <Wrapper>
                    <H1>Login</H1>
                    <Formbox onSubmit={this.handleFormSubmit}>
                        <Input placeholder="Email" name="email" type="text" onChange={this.handleChange}/>
                        <Input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
                        <Submit value="SUBMIT" type="submit" />
                    </Formbox>
                </Wrapper>

        );
    }

    handleFormSubmit(event){
        event.preventDefault();
        this.JWT_auth.login(this.state.email,this.state.password).then(response =>{this.props.history.replace('/')})
    }

    handleChange(event){this.setState({[event.target.name]: event.target.value })}
}

export default LoginForm;
