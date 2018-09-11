// This component will render the booked and available timeslots inside a ResourceCard component
import React from 'react';
import {
  Icon, Label, Menu, Table, Header, Container, Grid, Segment,
} from 'semantic-ui-react';
import './TimeBar.css';

class TimeBar extends React.Component {
  state = {};

  render() {
    console.log(this.props.bookings);

    return (
      <Container className="timebar" fluid textAlign="center" vert>
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass2" />
        <div className="tempClass2" />
        <div className="tempClass2" />
        <div className="tempClass2" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass" />
        <div className="tempClass2" />
        <div className="tempClass2" />
        <div className="tempClass2" />
        <div className="tempClass2" />
      </Container>
    );
  }
}

export default TimeBar;
