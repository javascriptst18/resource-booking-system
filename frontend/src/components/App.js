import React from 'react';
import { Container, Menu, Button, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker'; // Generates the calendar component
import moment from 'moment'; // Required for react-datepicker

import LoginForm from './LoginForm';
import NavBar from './NavBar';
import ResourceList from './ResourceList';
import mockResources from '../mockResources'; // Mock resources will be replaced by a call to the backend API

import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class App extends React.Component {
  state = {
    user: '',
    error: '',
    isLoading: false,
    startDate: moment(),
  };

  componentDidMount() {
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

  render() {
    return (
      <div>
        <NavBar />
        <Container textAlign="center" style={{ marginTop: '5em', marginBottom: '1.5em' }}>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="time"
          />
        </Container>
        <Container>
          <ResourceList resources={mockResources} />
        </Container>
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
