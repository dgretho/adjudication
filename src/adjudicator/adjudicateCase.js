/* global fetch */
import React from 'react';
import { render } from 'react-dom';

import AdjudicationTable from './adjudicationTable';


class AdjudicateCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            case: {}
        };
        
        this.refreshCaseDetails(this.props.caseId);
    }

    render() {
        return (
            <div className="container">
                <h2>Please review this case</h2>
                <FormGroup validationState={this.getAddressValidationState()}>
                    <ControlLabel>Address</ControlLabel>
                    <FormControl.Static>{this.state.case.address}</FormControl.Static>
                </FormGroup>
                <FormGroup validationState={this.getDepositAmountValidationState()}>
                    <ControlLabel>Deposit Amount</ControlLabel>
                    <FormControl.Static>{this.state.case.depositAmount}</FormControl.Static>
                </FormGroup>
            </div>
        );
    }
    
    refreshCaseDetails(caseId) {
        var self = this; /* TODO: There must be a better way of handling this */
        fetch('/case/' + caseId)
            .then(function(response) {
                if(response.ok) {
                    return response.json();    
                } else {
                    console.log('Network response not ok');
                }
            })
            .then(function(newCase) {
                self.setState({ case: newCase });
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            });
    }
}

export default AdjudicateCase;
