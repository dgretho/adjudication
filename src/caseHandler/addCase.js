import React from 'react';
import { render } from 'react-dom';

import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import InputField from './inputField'

class AddCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false,
            fields: [
                this.createField("Address", "text"),
                this.createField("Deposit Amount", "number"),
                this.createField("Amount Tenant Requests", "number"),
                this.createField("Amount Landlord Requests", "number")
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
            field.value = "";
        });
        this.setState({ fields: fields, showModal: true });
    }
    
    createField(label, type) {
        var field = {
            label: label,
            type: type,
            isValid: true,
            value: ""
        };
        
        field.getValidationState = function() {
            return field.isValid ? null : 'error';
        };
        
        field.handleChange = function(e) {
            field.value = e.target.value;
            field.validate();
            this.setState({ fields: this.state.fields.slice() });
        }
        
        field.validate = function() {
            if(   field.value.length === 0
               || (field.type === "number" && isNaN(field.value))) {
                field.isValid = false;
            } else {
                field.isValid = true;
            }
        }
        
        return field;
    }
}

export default AddCase;
