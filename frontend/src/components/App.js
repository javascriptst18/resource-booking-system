import React from 'react';
import LoginForm from './LoginForm';
import { Container, Menu, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ResourceList from './ResourceList';

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
        <Menu fixed="top">
          <Menu.Item position="right">
            <Button color="blue">Log in</Button>
          </Menu.Item>
        </Menu>
        <Container textAlign="center" style={{ marginTop: '5em' }}>
          <DatePicker dateFormat="DD MMM YYYY" selected={this.state.startDate} onChange={this.handleChange} />
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
