import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class LoginForm extends Component {

  state = {
    username: '',
    password: '',
    error: ''
  };

  onSubmit = (event) => {
    event.preventDefault();
    fetch(`/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {

        this.props.login(user);
      })
      .catch(error => {this.setState({ error: 'Invalid username or password' });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Container fluid textAlign="left" style={{ marginTop: '5em' }}>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" onChange={this.handleChange} value={this.state.email}/>
          <p>{this.state.error}</p>

          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
          <p>{this.state.error}</p>

          <button type="submit">Submit</button>;
        </form>
      </Container>
  )
    ;
  }
}

export default LoginForm;
