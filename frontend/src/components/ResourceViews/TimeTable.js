import React from 'react';
import { Table, Label, Menu } from 'semantic-ui-react';
import datefns from 'date-fns';

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

class TimeTable extends React.Component {
  state = {};

  selectTimeSlot = () => {
    return null;
  }

  render() {
    const timeSlotsArr = generateTimeSlotsArray();

    const daySlots = [0, 1, 2, 3, 4].map(e => (
      <Table.HeaderCell key={e}>
        <p>{datefns.format(datefns.addDays(new Date(), e), 'ddd MM/DD')}</p>
      </Table.HeaderCell>
    ));

    const timeSlots = timeSlotsArr.map((e) => {
      const styleContainer = { backgroundColor: 'lightgreen' };
      let styleContainer1 = {};

      if (datefns.isBefore(e, Date.now())) {
        styleContainer1 = { display: 'none' };
      }

      return (
        <Table.Row key={e} style={styleContainer1}>
          <Table.Cell style={{ padding: '0.2rem' }}>
            <Label basic size="small">
              {datefns.format(e, 'HH:mm')}
            </Label>
          </Table.Cell>
          {[0, 1, 2, 3, 4].map(e => (
            <Table.Cell onClick={this.selectTimeSlot} key={e} style={styleContainer} />
          ))}
        </Table.Row>
      );
    });

    return (
      <Table columns={6} celled textAlign="center" compact unstackable>
        <Table.Header className="timeTableHeader">
          <Table.Row verticalAlign="bottom">
            <Table.HeaderCell>Time</Table.HeaderCell>
            {daySlots}
          </Table.Row>
        </Table.Header>
        <Table.Body>{timeSlots}</Table.Body>
      </Table>
    );
  }
}

export default TimeTable;
