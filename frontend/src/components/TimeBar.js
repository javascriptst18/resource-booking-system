// This component will render the booked and available timeslots inside a ResourceCard component
import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
import './TimeBar.css';

class TimeBar extends React.Component {
  state = {};

  render() {
    console.log(this.props);

    return (
      <Container className="timebar" fluid textAlign="center">
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
