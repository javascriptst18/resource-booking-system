import React from 'react';
import ResourceList from './ResourceList';

class App extends React.Component {

  state = {
    resources: [],
  }

  render() {
    return (
      <ResourceList />
    );
  }
}

export default App;
