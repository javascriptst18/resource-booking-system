// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import { Menu, Icon, Dropdown, DropdownDivider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function TopNavbar(props) {
  return (
    <Menu borderless compact fixed="top">
      <Menu.Item>
        <Menu.Header as={Link} to="/">
          <h2>Resource Booker</h2>
        </Menu.Header>
      </Menu.Item>
      <Menu.Item position="right">
        <Icon name="search" size="big" fitted />
      </Menu.Item>
      <Dropdown item icon="user big" direction="left" simple>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/myBookings" text="My Bookings" />
          <Dropdown.Item as={Link} to="/userProfile" text="User Profile" />
          <DropdownDivider />
          <Dropdown.Item as={Link} to="/logout" text="Log Out" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

export default TopNavbar;
