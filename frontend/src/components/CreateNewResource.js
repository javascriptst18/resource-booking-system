import React from 'react';
import { Form, Container, Button, Divider } from 'semantic-ui-react';

class CreateNewResource extends React.Component {
  state = {};

  render() {
    return (
      <Container fluid textAlign="left" style={{ marginTop: '5em' }}>
        <Form>
          <Form.Input  label="Name" placeholder="(ex. Meeting Room 5)" />
          <Form.Input  label="Category" placeholder="(ex. Venue or Equipment)" />
          <Form.Input  label="Description" placeholder="Describe this resource" />
        </Form>
        <Divider hidden />
        <Button type='submit'>Create New Resource</Button>
      </Container>
    );
  }
}

export default CreateNewResource;

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
