// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// The Button component will render the login form
function NavBar(props) {
  return (
    <Menu borderless fixed="top">
      <Menu.Item>
        <h3>
          <i>Thing Booker</i>
        </h3>
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
