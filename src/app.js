/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import CaseHandler from './caseHandler';


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={CaseHandler} />
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));