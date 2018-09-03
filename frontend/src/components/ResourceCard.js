import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function ResourceCard(props) {
  return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          {props.type}
        </Card.Meta>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
          <Button basic color="green"> Book </Button>
      </Card.Content>
    </Card>
  )
}

export default ResourceCard;