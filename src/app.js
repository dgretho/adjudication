/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { PageHeader } from 'react-bootstrap';

import CaseTable from './caseTable';


class App extends React.Component {
    constructor() {
        super();
        
        var self = this;
        self.state = {
            cases: []
        }
        
        fetch('/cases')
            .then(function(response) {
                if(response.ok) {
                    return response.json();    
                } else {
                    console.log('Network response not ok');
                }
            })
            .then(function(cases) {
                self.setState({
                    cases: cases
                });
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            })
            
    }

    render() {
        return (
            <div className="container">
                <h2>Please review the cases waiting to be assigned</h2>
                <CaseTable cases={this.state.cases}/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));