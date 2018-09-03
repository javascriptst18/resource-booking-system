import React from 'react';
import { Menu, Dropdown, Button, Input } from 'semantic-ui-react';

function NavMenu(props) {
  return (
    <Menu size="huge" fluid>
      <Menu.Item name="home" />
      <Menu.Item name="My Bookings" />

      <Menu.Menu position="right">
        <Menu.Item>
          <Input className="icon" icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item>
          <Button primary>Log In</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default NavMenu;
