// This component generates the fixed navigation bar on the top of the page
import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

// The Button component will render the login form
function NavBar(props) {
  return (
    <Menu borderless fixed="top">
      <Menu.Item borderless>
        <h3>
          <i>Thing Booker</i>
        </h3>
      </Menu.Item>
      <Menu.Item position="right">
        <Button color="blue">Log in</Button>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;