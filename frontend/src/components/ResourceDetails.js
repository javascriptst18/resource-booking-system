// WIP
import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

class ResourceDetails extends React.Component {
  state = {
    resource: {
      identifier: '',
    },
  };

  componentDidMount() {
    this.fetchSingleResource().then(response => this.setState({ resource: response }));
  }

  fetchSingleResource = () => {
    return fetch(`/resources/${this.props.match.params.id}`).then(response => response.json());
  };

  render() {
    return (
      <Container style={{ marginTop: '5em' }}>
        <Grid stretched divided columns="equal">
          <Grid.Row>
            <Grid.Column>
              <h2>{this.state.resource.identifier}</h2>
            </Grid.Column>
            <Grid.Column>
              <Segment secondary>{this.state.resource.tags}</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container fluid textAlign="center">{this.state.resource.description}</Container>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ResourceDetails;
