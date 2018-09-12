// This component will render the booked and available timeslots inside a ResourceCard component
import React from 'react';
import { Container, Table, Label, Segment } from 'semantic-ui-react';
import './TimeBar.css';
import datefns from 'date-fns';

const generateTimeSlotsArray = (startHour = 8, endHour = 17, intervalMinutes = 15) => {
  const arr = [];
  let time = new Date();
  for (let i = startHour; i < endHour; i++) {
    time = datefns.setHours(time, i);
    for (let ii = 0; ii < 60; ii = ii + intervalMinutes) {
      time = datefns.setMinutes(time, ii);
      time = datefns.setSeconds(time, 0);
      arr.push(time);
    }
  }
  return arr;
};

class TimeBar extends React.Component {
  state = {};

  render() {
    const TableCells = generateTimeSlotsArray().map(e => {
      let bColor = 'lightgreen';
      let disp = 'inline-block';
      if (datefns.isBefore(e, Date.now())) {
        disp = 'none';
      }

      return (
        <div
          style={{
            backgroundColor: bColor,
            display: disp,
            width: '1rem',
            height: '1rem',
            margin: '0',
            padding: '0',
          }}
        />
      );
    });

    return <div style={{ padding: '0', margin: '0' }}>{TableCells}</div>;
  }
}

export default TimeBar;
