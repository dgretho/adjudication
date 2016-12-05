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
            casesAwaitingEvidence: []
        }
        
        this.refreshCaseList();
        
        this.handleAddCase = this.handleAddCase.bind(this)
    }

    render() {
        return (
            <div className="container">
                <h2>Please review the cases waiting to be assigned</h2>
                <CaseTable cases={this.state.casesAwaitingEvidence} 
                           addEvidence={this.handleAddEvidence.bind(this)}
                           markForAdjudication={this.markForAdjudication.bind(this)}/>
                <div className="pull-right">
                    <AddCase addCase={this.handleAddCase.bind(this)}/>
                </div>
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
                var casesAwaitingEvidence = cases.filter(function(newCase){
                    return newCase.status === 'awaiting evidence';
                });
                self.setState({ casesAwaitingEvidence: casesAwaitingEvidence });
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
    
    markForAdjudication(caseReference) {
        this.serverPost(('markForAdjudication'), { caseReference : caseReference });
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