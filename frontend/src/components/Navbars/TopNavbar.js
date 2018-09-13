// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import {
  Menu, Icon, Dropdown, DropdownDivider,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserMenu from '../UserViews/UserMenu';

function TopNavbar(props) {
  return (
    <Menu borderless compact fixed="top">
      <Menu.Item icon position="left">
        <Icon name="search" size="big" />
      </Menu.Item>
      <Menu.Item header>
        <Link to="/">
          <Menu.Header>
            <h2>Resource Booker</h2>
          </Menu.Header>
        </Link>
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
