import React from 'react';
import { render } from 'react-dom';

import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class AddCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false,
            address: "",
            addressValidationEnabled: false,
            depositAmount: "",
            depositAmountValidationEnabled: false,
            amountTenantRequests: "",
            amountTenantRequestsValidationEnabled: false,
            amountLandlordRequests: "",
            amountLandlordRequestsValidationEnabled: false
        };
    }
    
    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={() => this.open()}>Add Case</Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new case</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup validationState={this.getAddressValidationState()}>
                            <ControlLabel>Address</ControlLabel>
                            <FormControl type="text" 
                                         onChange={this.handleAddressChange.bind(this)}
                                         onBlur={this.handleAddressChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup validationState={this.getDepositAmountValidationState()}>
                            <ControlLabel>Deposit Amount</ControlLabel>
                            <FormControl type="text" 
                                         onChange={this.handleDepositAmountChange.bind(this)}
                                         onBlur={this.handleDepositAmountChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup validationState={this.getAmountTenantRequestsValidationState()}>
                            <ControlLabel>Amount Tenant Requests</ControlLabel>
                            <FormControl type="text" 
                                         onChange={this.handleAmountTenantRequestsChange.bind(this)}
                                         onBlur={this.handleAmountTenantRequestsChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup validationState={this.getAmountLandlordRequestsValidationState()}>
                            <ControlLabel>Amount Landlord Requests</ControlLabel>
                            <FormControl type="text" 
                                         onChange={this.handleAmountLandlordRequestsChange.bind(this)}
                                         onBlur={this.handleAmountLandlordRequestsChange.bind(this)}/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => this.addCase()}>Add Case</Button>
                        <Button bsStyle="primary" onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    /* TODO: Make this validation generic */
    getAddressValidationState() {
        if(this.state.addressValidationEnabled && this.state.address.length === 0) {
            return 'error';    
        } else {
            return null;
        }
    }
    
    getDepositAmountValidationState() {
        var depositAmount = this.state.depositAmount;
        if(this.state.depositAmountValidationEnabled && (depositAmount.length === 0 || isNaN(depositAmount))) {
            return 'error';    
        } else {
            return null;
        }
    }
    
    getAmountTenantRequestsValidationState() {
        var amountTenantRequests = this.state.amountTenantRequests;
        if(this.state.amountTenantRequestsValidationEnabled && (amountTenantRequests.length === 0 || isNaN(amountTenantRequests))) {
            return 'error';    
        } else {
            return null;
        }
    }
    
    getAmountLandlordRequestsValidationState() {
        var amountLandlordRequests = this.state.amountLandlordRequests;
        if(this.state.amountLandlordRequestsValidationEnabled && (amountLandlordRequests.length === 0 || isNaN(amountLandlordRequests))) {
            return 'error';    
        } else {
            return null;
        }
    }
    
    handleAddressChange(e) {
        this.setState({ address: e.target.value, addressValidationEnabled: true });
    }
    
    handleDepositAmountChange(e) {
        this.setState({ depositAmount: e.target.value, depositAmountValidationEnabled: true });
    }
    
    handleAmountTenantRequestsChange(e) {
        this.setState({ amountTenantRequests: e.target.value, amountTenantRequestsValidationEnabled: true });
    }
    
    handleAmountLandlordRequestsChange(e) {
        this.setState({ amountLandlordRequests: e.target.value, amountLandlordRequestsValidationEnabled: true });
    }
    
    addCase() {
        // Enable all validation when submitting
        this.setState({ addressValidationEnabled: true, depositAmountValidationEnabled: true, amountTenantRequestsValidationEnabled: true, amountLandlordRequestsValidationEnabled: true }, function() {
            if(this.getAddressValidationState() === null && this.getDepositAmountValidationState() === null && this.getAmountTenantRequestsValidationState() === null && this.getAmountLandlordRequestsValidationState() === null) {
                this.props.addCase({ address: this.state.address, depositAmount: this.state.depositAmount, amountTenantRequests: this.state.amountTenantRequests, amountLandlordRequests: this.state.amountLandlordRequests });
                this.setState({ showModal: false });
            }
        });
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ 
            showModal: true, 
            address: "",
            addressValidationEnabled: false,
            depositAmount: "",
            depositAmountValidationEnabled: false,
            amountTenantRequests: "",
            amountTenantRequestsValidationEnabled: false,
            amountLandlordRequests: "",
            amountLandlordRequestsValidationEnabled: false
        });
    }
}

export default AddCase;
