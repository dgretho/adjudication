import React from 'react';
import {render} from 'react-dom';
import {PageHeader} from 'react-bootstrap'

class Hello extends React.Component {
  render () {
    return (<PageHeader>Hello World!</PageHeader>);
  }
}

export default Hello;