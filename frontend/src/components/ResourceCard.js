// This component generates ResourceCards that populate the Card Group
import React from 'react';
import { Card, Button, Segment } from 'semantic-ui-react';

function ResourceCard(props) {
  return (
    <Card raised fluid>
      <Card.Content>
      <Segment compact size="small" secondary floated="right">
        {props.tags.map(tag => <p> {tag} </p>)}
      </Segment>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.type}</Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        PLACEHOLDER FOR TIMEBAR
      </Card.Content>
      
    </Card>
  );
}

export default ResourceCard;
