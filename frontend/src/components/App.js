import React from 'react';
import LoginForm from './LoginForm';

class App extends React.Component {
  state = {
    user: '',
    error: '',
    isLoading: false
  };

  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({ user: JSON.parse(user) });
    }
  }

  login = (user) => {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout = () => {
    fetch('/logout')
      .then(() => {
        this.setState({ user: '' });
      })
  }

  render() {
    if (this.state.user) {
      return (
        <div className="App container">
          <button id="logout" onClick={this.logout}>Logout</button>
          <div><p>Successfully logged in</p></div>
        </div>
      );
    } else {
      return (
        <div className="App container">
          <LoginForm login={this.login}/>
        </div>
      );
    }
  }
}

export default App;
