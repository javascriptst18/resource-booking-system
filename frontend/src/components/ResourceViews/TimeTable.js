import React from 'react';
import { Table, Label, Menu, Popup, Segment, Icon } from 'semantic-ui-react';
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
    bookings: [],
    startPage: [0, 1, 2, 3, 4],
    updateMe: 0,
  };

  componentDidMount() {
    this.fetchBookings().then(res => this.setState({ bookings: res }, () => console.log(this.state.bookings)));
  }

  updateStartPage = (direction) => {
    let newStartPage = [...this.state.startPage];
    newStartPage = newStartPage.map(e => e + direction);
    this.setState({ startPage: newStartPage });
  }

  fetchBookings = () => fetch('/bookings').then(response => response.json());

  isBooked = dateValue => {
    const bookingsArr = [...this.state.bookings];
    let occupied = false;
    let by = '';
    bookingsArr.forEach(booking => {
      let st = new Date(booking.startTime);
      let et = datefns.subMinutes(new Date(booking.endTime), 1);
      if (datefns.isWithinRange(dateValue, st, et)) {
        occupied = true;
        by = booking.name;
      }
    });
    return { occupied, by };
  };

  selectTimeSlot = event => {
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
      console.log('Cannot select a date from the past. Let it go.');
    } else if (arr.length > 0 && Math.abs(datefns.differenceInMinutes(targetDate, datefns.closestTo(targetDate, arr))) > 16) {
      console.log('Cannot select non-adjacent timeslots.');
    } else if (event.target.attributes[2].value === 'background-color: lightsalmon;') {
      console.log('Cannot select booked timeslots.');
    } else {
      arr.push(targetDate);
    }
    this.setState({ selectedTimeSlots: arr });
  };

  render() {
    const timeSlotsArr = generateTimeSlotsArray();

    const daySlots = this.state.startPage.map(e => (
      <Table.HeaderCell key={e} verticalAlign="middle" style={{ fontSize: '0.85rem', padding: '0' }}>
        <span>{datefns.format(datefns.addDays(new Date(), e), 'ddd')}</span>
        <p>{datefns.format(datefns.addDays(new Date(), e), 'MM/DD')}</p>
      </Table.HeaderCell>
    ));

    const timeSlots = timeSlotsArr.map(e => {
      let styleContainer = { backgroundColor: 'lightgreen' };

      return (
        <Table.Row key={e}>
          <Table.HeaderCell style={{ fontSize: '0.85rem', padding: '0.5rem', backgroundColor: 'rgb(249, 250, 251)' }}>
            {/* <Label basic size="small">
              {datefns.format(e, 'HH:mm')}
            </Label> */}
            {datefns.format(e, 'HH:mm')}
          </Table.HeaderCell>
          {this.state.startPage.map(ee => {
            const cellDate = datefns.addDays(e, ee);
            styleContainer = { backgroundColor: 'lightgreen' };

            if (datefns.isSaturday(cellDate) || datefns.isSunday(cellDate)) {
              styleContainer.backgroundColor = 'grey';
              return (
                <Popup
                  trigger={<Table.Cell value={cellDate} onClick={this.selectTimeSlot} key={ee} style={styleContainer} />}
                  content={`This timeslot has not been made available.`}
                  basic
                />
              );
            }

            if (this.isBooked(cellDate).occupied) {
              styleContainer.backgroundColor = 'lightsalmon';
              return (
                <Popup
                  trigger={<Table.Cell value={cellDate} onClick={this.selectTimeSlot} key={ee} style={styleContainer} />}
                  content={`Booked by ${this.isBooked(cellDate).by}`}
                  basic
                />
              );
            }

            if (datefns.isBefore(cellDate, Date.now())) {
              styleContainer.backgroundColor = 'lightgrey';
              return (
                <Popup
                  trigger={<Table.Cell value={cellDate} onClick={this.selectTimeSlot} key={ee} style={styleContainer} />}
                  content={`Cannot book past timeslots. Let it go.`}
                  basic
                />
              );
            }

            if (this.state.selectedTimeSlots.includes(cellDate.toString())) {
              styleContainer.backgroundColor = 'cornflowerblue';
            }
            return <Table.Cell value={cellDate} onClick={this.selectTimeSlot} key={ee} style={styleContainer} />;
          })}
        </Table.Row>
      );
    });

    return (
      <React.Fragment>

        <Table columns={6} celled textAlign="center" compact unstackable>
          <Table.Header className="timeTableHeader">
            <Table.Row verticalAlign="bottom">
              <Table.HeaderCell verticalAlign="middle">Time</Table.HeaderCell>
              {daySlots}
            </Table.Row>
          </Table.Header>
          <Table.Body>{timeSlots}</Table.Body>
        </Table>
        <BottomNavbar
          bookingSelection={this.state.selectedTimeSlots}
          resourceIdentifier={this.props.resourceIdentifier}
          resourceID={this.props.resourceID}
          updateStartPage={this.updateStartPage}
        />
      </React.Fragment>
    );
  }
}

export default TimeTable;
