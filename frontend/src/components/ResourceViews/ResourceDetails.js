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
        <Grid.Row style={{paddingBottom:"0"}}>
          <Grid.Column textAlign="center">
            <h2>{this.state.resource.identifier}</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{paddingBottom:"0.2rem"}}>
          <Container text fluid textAlign="center">
          <Segment compact>
            {this.state.resource.description}
            </Segment>
          </Container>
        </Grid.Row>
        <Grid.Row style={{marginBottom:"0"}}>
          <Grid.Column>
            <TimeTable resourceIdentifier={this.state.resource.identifier} resourceID={this.props.match.params.id} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered style={{ marginBottom: '5rem' }}>
          <AdminDeleteResource resourceID={this.props.match.params.id} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default ResourceDetails;
