import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import MakeBooking from '../UserControllers/MakeBooking';

class BottomNavbar extends React.Component {
  state = {};

  render() {
    return (
      <Menu size="small" borderless compact fixed="bottom">
        <Menu.Item position="right">
          08:00 to 09:00 - 1 Hour
        </Menu.Item>
        <Menu.Item position="right">
          <MakeBooking />
        </Menu.Item>
      </Menu>
    );
  }
}

export default BottomNavbar;
