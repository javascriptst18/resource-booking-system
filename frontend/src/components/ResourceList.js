import React from 'react';
import { Card } from 'semantic-ui-react';
import ResourceCard from './ResourceCard';


function ResourceList(props) {

  const resources = props.resources.map((resource) => 
    <ResourceCard {...resource} key={resource.resourceID} />
  );
  
  return (
    <Card.Group centered>
      {resources}
    </Card.Group>
  )
}

export default ResourceList;
