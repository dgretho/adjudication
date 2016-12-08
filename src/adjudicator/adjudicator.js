/* global fetch */
import React from 'react';
import { render } from 'react-dom';

import AdjudicationTable from './adjudicationTable';


class Adjudicator extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            casesAwaitingAdjudication: []
        };
        
        this.refreshCaseList();
    }

    render() {
        return (
            <div className="container">
                <h2>Please review the cases waiting to be adjudicated</h2>
                <AdjudicationTable cases={this.state.casesAwaitingAdjudication} onRowClick={this.handleRowClick.bind(this)}/>
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
                var casesAwaitingAdjudication = cases.filter(function(newCase){
                    return newCase.status === 'awaiting adjudication';
                });
                self.setState({ casesAwaitingAdjudication: casesAwaitingAdjudication });
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            });
    }
    
    handleRowClick(caseId) {
        this.props.router.push('/adjudicate/' + caseId);
    }
}

export default Adjudicator;
