import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import TimeTable from './TimeTable';
import AdminDeleteResource from '../UserControllers/AdminDeleteResource';

class ResourceDetails extends React.Component {
  state = {
    resource: {
      identifier: '',
    },
  };

  componentDidMount() {
    this.fetchSingleResource().then(response => this.setState({ resource: response }));
  }

  fetchSingleResource = () => fetch(`/resources/${this.props.match.params.id}`).then(response => response.json());

  render() {
    return (
        <Grid divided columns="equal">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>{this.state.resource.identifier}</h2>
            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container fluid textAlign="center">
              {this.state.resource.description}
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TimeTable />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <AdminDeleteResource resourceID={this.props.match.params.id} />
          </Grid.Row>
        </Grid>
    );
  }
}

export default ResourceDetails;
