/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from './home';
import CaseHandler from './caseHandler/caseHandler';
import Adjudicator from './adjudicator/adjudicator';
import AdjudicateCase from './adjudicator/adjudicateCase';


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home} />
                <Route path='/caseHandler' component={CaseHandler} />
                <Route path='/adjudicator' component={Adjudicator} />
                <Route path='/adjudicate/:caseId' component={AdjudicateCase} />
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));