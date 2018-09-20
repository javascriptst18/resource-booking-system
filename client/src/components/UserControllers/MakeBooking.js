import React from 'react';
import { Button } from 'semantic-ui-react';
import datefns from 'date-fns';

class MakeBooking extends React.Component {
  state = {  };

  handleClick = () => {
    const arr = this.props.bookingSelection;
    const startTime = new Date(arr[0]);
    let endTime = new Date(arr[arr.length - 1]);
    endTime = datefns.addMinutes(endTime, 15);
    const resourceID = this.props.resourceID;
    const username = 'Richy Ownington III'; //Demo placeholder

    const bookingConfirmationObject = {
      username,
      resourceID,
      startTime,
      endTime,
    };
    fetch('/bookings/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingConfirmationObject),
    })
      .then(response => response.json())
      .then(response => console.log(response))
  };

  render() {
    return (
      <Button onClick={this.handleClick} size="medium" compact color="green">
        Confirm Booking
      </Button>
    );
  }
}

export default MakeBooking;
