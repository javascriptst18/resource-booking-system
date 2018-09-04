import React from 'react';
import { Grid } from 'semantic-ui-react';
import NavMenu from './NavMenu';
import ResourceList from './ResourceList';

const API = {
  resources: '/resources',
  bookings: '/bookings',
  myBookings: '/bookings/mybookings',
};

class App extends React.Component {
  state = {
    resources: [],
  };

  componentDidMount() {
    this.apiGet(API.resources).then(response => this.setState({ resources: response }));
  }

  apiGet = url => fetch(url).then(response => response.json());

  render() {
    return (
      <Grid container relaxed>
        <Grid.Row columns={2}>
          <Grid.Column width={3}>
            <NavMenu />
          </Grid.Column>
          <Grid.Column width={12}>
            <ResourceList resources={this.state.resources} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
