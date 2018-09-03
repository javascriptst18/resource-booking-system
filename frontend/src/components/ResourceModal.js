import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';

function ResourceModal(props) {
  return (
    <Modal trigger={<Button basic color="green"> Book </Button>} centered={false}>
      <Modal.Header>{props.type} Details</Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <Header>{props.name}</Header>
          <p>{props.description}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ResourceModal;