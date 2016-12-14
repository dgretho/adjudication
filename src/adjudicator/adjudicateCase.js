/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import InputField from '../common/inputField';

class AdjudicateCase extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            case: {},
            validCaseId: true,
            amountToReturnToLandlord: "",
            adjudicationValid: true
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
                    <FormGroup>
                        <ControlLabel>Amount In Dispute</ControlLabel>
                        <FormControl.Static>{this.amountInDispute()}</FormControl.Static>
                    </FormGroup>
                    <h2>How much should be paid to the landlord?</h2>
                    <InputField label="How much should be paid to the landlord" 
                                validationState={ this.getValidationState.bind(this) }
                                onChange={ this.handleChange.bind(this) } />
                    <Button bsStyle="success" onClick={() => this.adjudicate()}>Adjudicate</Button>
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
    
    amountInDispute() {
        var tenantAmount = parseInt(this.state.case.amountTenantRequests);
        var landlordAmount = parseInt(this.state.case.amountLandlordRequests);
        var depositAmount = parseInt(this.state.case.depositAmount);
        
        // The landlord can request more than the total deposit amount
        landlordAmount = Math.min(landlordAmount, depositAmount);
        
        return (tenantAmount + landlordAmount) - depositAmount;
    }
    
    getValidationState() {
        return this.state.adjudicationValid ? null : 'error';
    }
    
    handleChange(e) {
        var isValid = this.isValid(e.target.value);
        this.setState({ amountToReturnToLandlord: e.target.value, adjudicationValid: isValid });
    }
    
    isValid(value) {
        return value.length !== 0 && !isNaN(value) && (value <= this.amountInDispute());
    }
    
    adjudicate() {
        if(this.state.adjudicationValid) {
            var headers =  {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            };
            
            var content = JSON.stringify({
                caseReference: this.state.case.caseReference,
                amountToReturnToLandlord: this.state.amountToReturnToLandlord
            });
            
            var self = this;
            fetch('adjudicate', { method: 'POST', body: content, headers: headers })
                .then(function(response) {
                    self.props.router.push('/adjudicator');
                });
        }
    }
}

export default AdjudicateCase;
