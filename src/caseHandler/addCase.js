import React from 'react';
import { render } from 'react-dom';

import { Button, Modal } from 'react-bootstrap';

import InputField from '../common/inputField';

class AddCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false,
            fields: [
                this.createField("Address", "text"),
                this.createField("Deposit Amount", "number"),
                this.createField("Amount Tenant Requests", "tenant requested"),
                this.createField("Amount Landlord Requests", "landlord requested")
            ]
        };
    }
    
    render() {
        var fields = this.state.fields.map((field) => {
            return (
                <InputField label={ field.label } 
                            validationState={ field.getValidationState }
                            onChange={ field.handleChange.bind(this) }
                            key={ field.label } />
            );
        });
        
        return (
            <div>
                <Button bsStyle="primary" onClick={() => this.open()}>Add Case</Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new case</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { fields }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => this.addCase()}>Add Case</Button>
                        <Button bsStyle="primary" onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    addCase() {
        // Validate all fields when submitting
        var fields = this.state.fields.slice();
        fields.forEach((field) => {
            field.validate();
        });
        this.setState({ fields: fields }, function() {
            var formValid = !this.state.fields.some((field) => { return field.isValid === false; });
            if(formValid) {
                this.props.addCase({ 
                    address: this.state.fields[0].value, 
                    depositAmount: this.state.fields[1].value, 
                    amountTenantRequests: this.state.fields[2].value, 
                    amountLandlordRequests: this.state.fields[3].value
                });
                this.setState({ showModal: false });
            }
        });
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        var fields = this.state.fields.slice();
        fields.forEach((field) => {
            field.isValid = true;
            field.validationEnabled = false;
            field.value = "";
        });
        this.setState({ fields: fields, showModal: true });
    }
    
    createField(label, type) {
        var field = {
            label: label,
            type: type,
            isValid: true,
            validationEnabled: false,
            value: ""
        };
        
        field.getValidationState = function() {
            return field.isValid ? null : 'error';
        };
        
        field.handleChange = function(e) {
            field.value = e.target.value;
            field.validate();
            this.setState({ fields: this.state.fields.slice() });
        };
        
        field.validate = function() {
            field.validationEnabled = true;
            if(field.value.length === 0) {
                field.isValid = false;
            } else if (field.type === "number" && isNaN(field.value)) {
                field.isValid = false;
            } else if (field.type === "tenant requested" && field.amountTenantRequestedInvalid()) {
                field.isValid = false;
            } else if (field.type === "landlord requested" && field.amountLandlordRequestedInvalid()) {
                field.isValid = false;
            } else {
                field.isValid = true;
            }
        };
        
        var addCaseModel = this;
        field.amountTenantRequestedInvalid = function() {
            var depositAmount = parseInt(addCaseModel.state.fields[1].value);
            var amountTenantRequests = parseInt(addCaseModel.state.fields[2].value);
            
            // The tenant has to request some but can't request more than all the money
            return isNaN(depositAmount)
                || amountTenantRequests <= 0
                || amountTenantRequests > depositAmount
                || field.amountLandlordRequestedInvalid();
        }
        
        field.amountLandlordRequestedInvalid = function() {
            var amountLandlordRequests = parseInt(addCaseModel.state.fields[2].value);
            
            // The landlord can request more than the total deposit amount
            return amountLandlordRequests <= 0 || field.noDispute();
        }
        
        field.noDispute = function() {
            var depositAmountField = addCaseModel.state.fields[1];
            var amountTenantRequestsField = addCaseModel.state.fields[2];
            var amountLandlordRequestsField = addCaseModel.state.fields[3];
            var depositAmount = parseInt(depositAmountField.value);
            var amountTenantRequests = parseInt(amountTenantRequestsField.value);
            var amountLandlordRequests = parseInt(amountLandlordRequestsField.value);
            
            // If all three fields have been entered but there is no actual dispute
            return depositAmountField.validationEnabled && amountTenantRequestsField.validationEnabled && amountLandlordRequestsField.validationEnabled
                && (amountTenantRequests + amountLandlordRequests <= depositAmount);
        }
        
        return field;
    }
}

export default AddCase;
