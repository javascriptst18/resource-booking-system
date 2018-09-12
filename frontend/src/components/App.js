import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import LoginForm from './UserViews/LoginForm';
import TopNavbar from './Navbars/TopNavbar';
import ResourceList from './ResourceViews/ResourceList';
import ResourceDetails from './ResourceViews/ResourceDetails';
import AdminCreateResource from './UserControllers/AdminCreateResource';
import BottomNavbar from './Navbars/BottomNavbar';

import './App.css';
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
  }

  login = (user) => {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  };

  logout = () => {
    fetch('/logout').then(() => {
      this.setState({ user: '' });
    });
  };

  fetchBookings = () => fetch('/bookings').then(response => response.json());

  fetchResources = () => fetch('/resources').then(response => response.json());

  fetchApi = () => {
    fetch('/api-help')
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    return (
      <React.Fragment>
        <TopNavbar />
        <Container className="mainView" textAlign="center">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <ResourceList {...props} resources={this.state.allResources} />}
            />
            <Route path="/login" render={props => <LoginForm {...props} />} />
            <Route path="/newresource" render={props => <AdminCreateResource {...props} />} />
            <Route path="/resources/:id" render={props => <ResourceDetails {...props} />} />
            <Route
              render={props => <ResourceList {...props} resources={this.state.allResources} />}
            />
          </Switch>
        </Container>
        <BottomNavbar />
      </React.Fragment>
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
