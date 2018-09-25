import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class UserMenu extends React.Component {
  state = {};

  render() {
    return (
      <Dropdown item icon="user circle" simple>
        <Dropdown.Menu>
          <Dropdown.Item text="Profile" />
          <Dropdown.Item text="My Bookings" />
          <Dropdown.Divider />
          <Dropdown.Item text="Log Out" />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default UserMenu;
// <Link to="/login">
//   <Icon color="black" name="user circle" size="big" />
// </Link>;
