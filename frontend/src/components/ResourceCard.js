import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import ResourceModal from './ResourceModal';

function ResourceCard(props) {
  return (
    <Card fluid>
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
          <ResourceModal {...props} />
      </Card.Content>
    </Card>
  )
}

export default ResourceCard;