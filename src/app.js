/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Home from './home';
import CaseHandler from './caseHandler';


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home} />
                <Route path='/caseHandler' component={CaseHandler} />
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));