import React from 'react';
import { Button } from 'semantic-ui-react';

class DeleteResource extends React.Component {
  state = {};

  handleClick = () => fetch(`/resources/${this.props.resourceID}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => console.log(response));

  render() {
    return (
      <Button as="a" href="/home" color="red" onClick={this.handleClick} compact>
        Delete Resource
      </Button>
    );
  }
}

export default DeleteResource;
