import React from 'react';
import {render} from 'react-dom';
var hello = require('./hello');

var hellowWorld = hello + " World!";
class App extends React.Component {
  render () {
    return <p>{hellowWorld}</p>;
  }
}

render(<App/>, document.getElementById('app'));