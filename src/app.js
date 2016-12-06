/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Home from './home';
import CaseHandler from './caseHandler';
import Adjudicator from './adjudicator';


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home} />
                <Route path='/caseHandler' component={CaseHandler} />
                <Route path='/adjudicator' component={Adjudicator} />
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));