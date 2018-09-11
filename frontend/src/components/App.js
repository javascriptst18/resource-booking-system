import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginForm from './LoginForm';
import NavBar from './NavBar';
import ResourceList from './ResourceList';
import CreateNewResource from './CreateNewResource';
// import mockDatabase from '../mockDatabase'; // Mock resources will be replaced by a call to the backend API

class App extends React.Component {
  state = {
    user: '',
    error: '',
    isLoading: false,
    bookings: [],
    allResources: [],
  };

  componentDidMount() {
    this.fetchResources().then(res => this.setState({ allResources: res }));
    this.fetchBookings().then(res => this.setState({ bookings: res }));
    // const user = localStorage.getItem('user');
    // if (user) {
    //   this.setState({ user: JSON.parse(user) });
    // }
    // The above code threw an error, commented it out temporarily for development
  }

  login = user => {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  };

  logout = () => {
    fetch('/logout').then(() => {
      this.setState({ user: '' });
    });
  };

  fetchBookings = () => {
    return fetch('/bookings').then(response => response.json());
  };

  fetchResources = () => {
    return fetch('/resources').then(response => response.json());
  };

  fetchApi = () => {
    fetch('/api-help')
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={props => <ResourceList {...props} resources={this.state.allResources} />} />
          <Route path="/login" render={props => <LoginForm {...props} />} />
          <Route path="/newresource" render={props => <CreateNewResource {...props} />} />
        </Switch>
      </div>
    );

    // if (this.state.user) {
    //   return (
    //     <div className="App container">
    //       <button id="logout" onClick={this.logout}>Logout</button>
    //       <div><p>Successfully logged in</p></div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="App container">
    //       <LoginForm login={this.login}/>
    //     </div>
    //   );
    // }
  }
}

export default App;
