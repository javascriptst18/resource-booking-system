import React from 'react';
import { Table, Label, Menu } from 'semantic-ui-react';
import datefns from 'date-fns';
import BottomNavbar from '../Navbars/BottomNavbar';

const generateTimeSlotsArray = (startHour = 8, endHour = 17, intervalMinutes = 15) => {
  const arr = [];
  let time = new Date();
  for (let i = startHour; i < endHour; i++) {
    time = datefns.setHours(time, i);
    for (let ii = 0; ii < 60; ii += intervalMinutes) {
      time = datefns.setMinutes(time, ii);
      time = datefns.setSeconds(time, 0);
      arr.push(time);
    }
  }
  return arr;
};

const daysAvailable = [0, 1, 2, 3, 4];

class TimeTable extends React.Component {
  state = {
    selectedTimeSlots: [],
  };

  selectTimeSlot = (event) => {
    console.log(event.target.attributes);
    let arr = [...this.state.selectedTimeSlots];
    arr = arr.sort((a, b) => datefns.compareAsc(a, b));
    const targetDate = event.target.attributes[0].value;
    if (arr.includes(targetDate.toString())) {
      const indexPosition = arr.indexOf(targetDate.toString());
      if ([0, arr.length - 1].includes(indexPosition)) {
        arr.splice(indexPosition, 1);
      }
    } else if (event.target.attributes[2].value === 'background-color: lightgrey;') {
      console.log('Cannot select a date from the past.');
    } else if (
      arr.length > 0
      && Math.abs(datefns.differenceInMinutes(targetDate, datefns.closestTo(targetDate, arr))) > 16
    ) {
      console.log('Too far man');
    } else {
      arr.push(targetDate);
    }
    this.setState({ selectedTimeSlots: arr });
  };

  render() {
    const timeSlotsArr = generateTimeSlotsArray();

    const daySlots = [0, 1, 2, 3, 4].map(e => (
      <Table.HeaderCell key={e}>
        <p>{datefns.format(datefns.addDays(new Date(), e), 'ddd MM/DD')}</p>
      </Table.HeaderCell>
    ));

    const timeSlots = timeSlotsArr.map((e) => {
      let styleContainer = { backgroundColor: 'lightgreen' };

      return (
        <Table.Row key={e}>
          <Table.Cell style={{ padding: '0.2rem' }}>
            <Label basic size="small">
              {datefns.format(e, 'HH:mm')}
            </Label>
          </Table.Cell>
          {[0, 1, 2, 3, 4].map((ee) => {
            const cellDate = datefns.addDays(e, ee);
            styleContainer = { backgroundColor: 'lightgreen' };

            if (datefns.isBefore(cellDate, Date.now())) {
              styleContainer.backgroundColor = 'lightgrey';
            }

            if (this.state.selectedTimeSlots.includes(cellDate.toString())) {
              styleContainer.backgroundColor = 'cornflowerblue';
            }
            return (
              <Table.Cell
                value={cellDate}
                onClick={this.selectTimeSlot}
                key={ee}
                style={styleContainer}
              />
            );
          })}
        </Table.Row>
      );
    });

    return (
      <React.Fragment>
        <Table columns={6} celled textAlign="center" compact unstackable>
          <Table.Header className="timeTableHeader">
            <Table.Row verticalAlign="bottom">
              <Table.HeaderCell>Time</Table.HeaderCell>
              {daySlots}
            </Table.Row>
          </Table.Header>
          <Table.Body>{timeSlots}</Table.Body>
        </Table>
        <BottomNavbar
          bookingSelection={this.state.selectedTimeSlots}
          resourceIdentifier={this.props.resourceIdentifier}
          resourceID={this.props.resourceID}
        />
      </React.Fragment>
    );
  }
}

export default TimeTable;
