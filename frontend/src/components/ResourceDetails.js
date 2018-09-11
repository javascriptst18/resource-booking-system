import React from 'react';

class ResourceDetails extends React.Component {
  state = {};

  render() {
    return (
      <Card raised fluid>
        <Card.Content>
          {/* <Segment compact size="small" secondary floated="right">
        {props.tags.map(tag => <p> {tag} </p>)}
      </Segment> */}
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>{props.type}</Card.Meta>
          <Card.Description>{props.description}</Card.Description>
        </Card.Content>
        <Segment compact attached="bottom">
          <TimeBar bookings={props.bookings} />
        </Segment>
      </Card>
    );
  }
}

export default ResourceDetails;
