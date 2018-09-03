import React from 'react';
import { Card } from 'semantic-ui-react';
import ResourceCard from './ResourceCard';
import mockResources from '../mockResources';

function ResourceList(props) {

  const resources = mockResources.map((resource) => 
    <ResourceCard {...resource} />
  );
  
  return (
    <Card.Group centered>
      {resources}
    </Card.Group>
  )
}

export default ResourceList;
