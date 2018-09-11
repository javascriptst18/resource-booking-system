// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// The Button component will render the login form
function NavBar(props) {
  return (
    <Menu  fixed="top">
      <Menu.Item icon position="left">
        <Icon name="search" size="big" />
      </Menu.Item>
      <Menu.Item position="right">
        <Link to="/login">
          <Button color="blue">Log in</Button>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
