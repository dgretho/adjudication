/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { PageHeader } from 'react-bootstrap';

import CaseTable from './caseTable';
import AddCase from './addCase';


class App extends React.Component {
    constructor() {
        super();
        
        this.state = {
            cases: []
        }
        
        this.refreshCaseList();
        
        this.handleAddCase = this.handleAddCase.bind(this)
    }

    render() {
        return (
            <div className="container">
                <h2>Please review the cases waiting to be assigned</h2>
                <CaseTable cases={this.state.cases} addEvidence={this.handleAddEvidence.bind(this)}/>
                <AddCase addCase={this.handleAddCase.bind(this)}/>
            </div>
        );
    }
    
    refreshCaseList() {
        var self = this; /* TODO: There must be a better way of handling this */
        fetch('/cases')
            .then(function(response) {
                if(response.ok) {
                    return response.json();    
                } else {
                    console.log('Network response not ok');
                }
            })
            .then(function(cases) {
                self.setState({ cases: cases });
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            });
    }
    
    handleAddEvidence(evidence, caseReference) {
        evidence.caseReference = caseReference;
        this.serverPost('evidence', evidence);
    }
    
    handleAddCase(newCase) {
        this.serverPost('case', newCase);
    }
    
    serverPost(url, jsonContent) {
        var self = this; /* TODO: There must be a better way of handling this */
        
        var headers =  {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var content = JSON.stringify(jsonContent);
        
        fetch(url, { method: 'POST', body: content, headers: headers })
            .then(function(response) {
                self.refreshCaseList();
            });
    }
}

render(<App/>, document.getElementById('app'));