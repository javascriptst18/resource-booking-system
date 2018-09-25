// This component renders a Card Group with ResourceCards
import React from 'react';
import { Card } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment'; // Required for react-datepicker

import ResourceCard from './ResourceCard';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

class ResourceList extends React.Component {

  state = {
    startDate: moment(),
  };

  render() {
    const resources = this.props.resources.map(resource => <ResourceCard {...resource} key={Math.random()} />);

    return (
      <React.Fragment>
        <DatePicker
          className="DPclass"
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />
        <Card.Group>{resources}</Card.Group>
      </React.Fragment>
    );
  }
}

export default ResourceList;
