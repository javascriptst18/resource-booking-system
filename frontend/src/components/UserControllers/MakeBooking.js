import React from 'react';
import { Button } from 'semantic-ui-react';

class MakeBooking extends React.Component {

  state = {}

  handleClick = () => {
    
  }

  render() {
    return <Button onClick={this.handleClick} size="medium" compact color="green">Confirm Booking</Button>;
  }
}

export default MakeBooking;
