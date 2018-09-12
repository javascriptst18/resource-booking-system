import React from 'react';
import {
  Form, Container, Button, Divider, Header,
} from 'semantic-ui-react';

class AdminCreateResource extends React.Component {
  state = {
    identifier: '',
    category: '',
    description: '',
  };

  newResourceRequest = () => {
    const reqbody = {
      identifier: this.state.identifier,
      category: this.state.category,
      description: this.state.description,
    };

    fetch('/resources', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqbody),
    })
      .then(response => response.json())
      .then(response => console.log(response));
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    this.newResourceRequest();
  };

  render() {
    const { identifier, category, description } = this.state;
    return (
      <Container textAlign="left" style={{ marginTop: '5em' }}>
        <Header dividing textAlign="right" style={{ marginTop: '3em', marginBottom: '1em' }}>
          <i>Create a new resource</i>
        </Header>
        <Form size="big" onSubmit={this.handleSubmit}>
          <Form.Input
            label="Name"
            name="identifier"
            value={identifier}
            placeholder="(ex. Meeting Room 5)"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Category"
            name="category"
            value={category}
            placeholder="(ex. Venue or Equipment)"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Description"
            name="description"
            value={description}
            placeholder="Describe this resource"
            onChange={this.handleChange}
          />

          <Divider hidden />
          <Button size="large" floated="left" type="submit" color="green">
            Create New Resource
          </Button>
          <Button size="large" floated="right" type="cancel" color="red">
            Cancel
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AdminCreateResource;

/*

    resourceID: Schema.Types.ObjectId,
    name: String,
    category: String,
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    tags: Array,
    description: String,
    availableDays: { type: Array, default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    availableTimes: Array,

*/
