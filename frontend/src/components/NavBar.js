// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// The Button component will render the login form
function NavBar(props) {
  return (
    <Menu borderless compact fixed="top">
      <Menu.Item icon position="left">
        <Icon name="search" size="big" />
      </Menu.Item>
      <Menu.Item header>
        <Menu.Header>
          <h2>
             Resource Booker 
          </h2>
        </Menu.Header>
      </Menu.Item>
      <Menu.Item icon position="right">
        <Link to="/login">
          <Icon color="black" name="user circle" size="big" />
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
