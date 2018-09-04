import React from 'react';
import {
  Menu, Dropdown, Button, Input,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class NavMenu extends React.Component {
  state = {};

  render() {
    return (
      <Menu vertical size="large" fixed="left">
        <Menu.Item>
          <DatePicker inline selected={this.state.startDate} onChange={this.handleChange} />
        </Menu.Item>
        <Menu.Item>
          <Button fluid color="blue">
            Log In
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button fluid>My Bookings</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;
