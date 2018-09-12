import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import datefns from 'date-fns';

// const TimeSlotsArray1 = (startHour = 8, endHour = 17, intervalMinutes = 15) => {
//   let temp;
//   const arr = [];
//   let ref = new Date();
//   ref = datefns.setMinutes(ref, datefns.getMinutes(ref) - (datefns.getMinutes(ref) % intervalMinutes));
//   ref = datefns.setSeconds(ref, 0);
//   console.log(ref);
//   for (i = startHour; i <= endHour; i++) {
//     let t = new Date();
//     t = datefns.setHours(t, i);
//   }
// };

const generateTimeSlotsArray = (startHour = 8, endHour = 17, intervalMinutes = 15) => {
  const arr = [];
  let time = new Date();
  for (let i = startHour; i < endHour; i++) {
    time = datefns.setHours(time, i);
    for (let ii = 0; ii < 60; ii = ii + intervalMinutes) {
      time = datefns.setMinutes(time, ii);
      arr.push(time);
    }
  }
  return arr;
};

class TimeTable extends React.Component {
  state = {};

  render() {
    let timeSlotsArr = generateTimeSlotsArray();

    // const daySlots;

    const timeSlots = timeSlotsArr.map(e => (
      <Table.Row key={e}>
        <Table.Cell style={{ padding: '0.2rem' }}>
          <Label size="large">{datefns.format(e, 'HH:mm')}</Label>
        </Table.Cell>
        <Table.Cell style={{ margin: '1rem', backgroundColor: 'lightgreen' }} />
        <Table.Cell style={{ margin: '1rem', backgroundColor: 'lightgreen' }} />
        <Table.Cell style={{ margin: '1rem', backgroundColor: 'lightgreen' }} />
        <Table.Cell style={{ margin: '1rem', backgroundColor: 'lightgreen' }} />
        <Table.Cell style={{ margin: '1rem', backgroundColor: 'lightgreen' }} />
      </Table.Row>
    ));

    const daySlots = [0, 1, 2, 3, 4].map(e => (
      <Table.HeaderCell>{datefns.format(datefns.addDays(new Date(), e), 'ddd MM/DD')}</Table.HeaderCell>
    ));

    return (
      <Table celled textAlign="center" compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>Time</Table.HeaderCell>
            {daySlots}
          </Table.Row>
        </Table.Header>
        <Table.Body>{timeSlots}</Table.Body>
      </Table>
    );
  }
}

export default TimeTable;
