/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class AdjudicateCase extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            case: {},
            validCaseId: true
        };
        
        this.refreshCaseDetails(props.params.caseId);
    }

    render() {
        if(this.state.validCaseId) {
            return (
                <div className="container">
                    <h2>Please review this case</h2>
                    <FormGroup>
                        <ControlLabel>Address</ControlLabel>
                        <FormControl.Static>{this.state.case.address}</FormControl.Static>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Deposit Amount</ControlLabel>
                        <FormControl.Static>{this.state.case.depositAmount}</FormControl.Static>
                    </FormGroup>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h2>This case is not valid for adjudication</h2>
                </div>
            );
        }
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
                if (newCase.status === 'awaiting adjudication') {
                    self.setState({ case: newCase });    
                } else {
                    self.setState({ validCaseId: false });
                }
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            });
    }
}

export default AdjudicateCase;
