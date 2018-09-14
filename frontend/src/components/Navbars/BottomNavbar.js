import React from 'react';
import {
  Menu, Button, Container, Segment,
} from 'semantic-ui-react';
import datefns from 'date-fns';
import MakeBooking from '../UserControllers/MakeBooking';

class BottomNavbar extends React.Component {
  state = {
  };

  generateBookingRange = (arr) => {
    if (arr.length === 0) {
      return 'No dates selected';
    }
    const selectedTimesArray = arr.sort((a, b) => datefns.compareAsc(a, b));
    const startTime = datefns.format(selectedTimesArray[0], 'HH:mm');
    const endTime = datefns.format(
      datefns.addMinutes(selectedTimesArray[arr.length - 1], 15),
      'HH:mm',
    );
    const bookingDate = datefns.format(selectedTimesArray[0], 'MMMM Do YYYY');
    const bookingDuration = datefns.distanceInWordsStrict(
      selectedTimesArray[0],
      datefns.addMinutes(selectedTimesArray[arr.length - 1], 15),
    );
    return (
      <Segment piled style={{ padding: '0.2rem', marginBottom: '0' }}>
        <p style={{ fontWeight: '800', marginBottom: '0' }}>{this.props.resID}</p>
        <p style={{ marginTop: '0', marginBottom: '0' }}>
          {`${startTime} to ${endTime} on ${bookingDate}`}
        </p>
        <p style={{ fontWeight: '800', marginTop: '0' }}>{bookingDuration}</p>
      </Segment>
    );
  };

  render() {
    const bookingRange = this.generateBookingRange(this.props.bookingSelection);

    return (
      <Menu vertical borderless fluid compact fixed="bottom" style={{backgroundColor:"snow"}}>
        <Menu.Item style={{ paddingBottom: '0.2rem' }}>{bookingRange}</Menu.Item>
        <Menu.Item style={{ padding: '0.5rem' }}>
          <MakeBooking bookingSelection={this.props.bookingSelection} resourceID={this.props.resourceID} />
        </Menu.Item>
      </Menu>
    );
  }
}

export default BottomNavbar;
