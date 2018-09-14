// This component generates ResourceCards that populate the Card Group
import React from 'react';
import { Card, Item, ItemImage, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TimeBar from './TimeBar';
import datefns from 'date-fns';

function ResourceCard(props) {
  let tempStart = new Date();
  tempStart = datefns.setHours(tempStart, 8);
  const startTimes = props.bookings.map(e => e.startTime);
  const endTimes = props.bookings.map(e => e.endTime);

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
      <Card.Content extra style={{ padding: '0 0 0.7rem 0'}}>
         <Label color="green">08:00-10:15</Label>
         <Label color="green">12:00-13:00</Label>
         <Label color="green">15:00-16:30</Label>
      </Card.Content>
    </Card>
  );
}

export default ResourceCard;
