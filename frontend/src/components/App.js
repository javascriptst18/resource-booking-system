import React from 'react';
import { Grid } from 'semantic-ui-react';
import NavMenu from './NavMenu';
import ResourceList from './ResourceList';


class App extends React.Component {

  state = {
    resources: [],
  }

  componentDidMount() {
    this.getAllResources()
      .then(response => this.setState({ resources: response}))
  }

  getAllResources = () => {
    return fetch('/resources')
      .then(response => response.json());
  }

  render() {
    return (
      <Grid container centered relaxed>
        <Grid.Row>
          <NavMenu />
        </Grid.Row>
        <Grid.Row>
          <ResourceList resources={this.state.resources} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
