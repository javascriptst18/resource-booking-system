import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

function Paginator(props) {
  return (
    <React.Fragment>
      <Icon onClick={() => props.updateStartPage(-1)} name="arrow alternate circle left outline" size="big" />
      <Icon name="calendar alternate outline" size="big" />
      <Icon onClick={() => props.updateStartPage(1)} name="arrow alternate circle right outline" size="big" />
    </React.Fragment>
  );
}

export default Paginator;
