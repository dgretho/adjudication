/* global fetch */
import React from 'react';
import { render } from 'react-dom';

import CaseHandler from './caseHandler';


class App extends React.Component {
    render() {
        return (
            <CaseHandler/>
        );
    }
}

render(<App/>, document.getElementById('app'));