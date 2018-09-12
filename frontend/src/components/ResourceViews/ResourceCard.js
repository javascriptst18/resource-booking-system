// This component generates ResourceCards that populate the Card Group
import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TimeBar from './TimeBar';

function ResourceCard(props) {
  return (
    <Card href={`/resources/${props._id}`} raised fluid key={props._id}>
      <Card.Content>
        {/* <Segment compact size="small" secondary floated="right">
        {props.tags.map(tag => <p> {tag} </p>)}
      </Segment> */}
        <Card.Header>{props.identifier}</Card.Header>
        <Card.Meta>{props.category}</Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content style={{padding:"0",margin:"0"}}>
        <TimeBar bookings={props.bookings} />
      </Card.Content>
    </Card>
  );
}

export default ResourceCard;
