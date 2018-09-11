// This component generates ResourceCards that populate the Card Group
import React from 'react';
import { Card, Button, Segment } from 'semantic-ui-react';
import TimeBar from './TimeBar';

function ResourceCard(props) {
  return (
    <Card raised fluid key={props.resourceID}>
      <Card.Content>
        {/* <Segment compact size="small" secondary floated="right">
        {props.tags.map(tag => <p> {tag} </p>)}
      </Segment> */}
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>{props.category}</Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <TimeBar bookings={props.bookings} />
      </Card.Content>
    </Card>
  );
}

export default ResourceCard;
