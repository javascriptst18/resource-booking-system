import React from 'react';
import { Grid } from 'semantic-ui-react';
import NavMenu from './NavMenu';
import ResourceList from './ResourceList';


class App extends React.Component {

  state = {
    resources: [],
  }

  render() {
    return (
      <Grid container centered relaxed>
        <Grid.Row>
          <NavMenu />
        </Grid.Row>
        <Grid.Row>
          <ResourceList />
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
