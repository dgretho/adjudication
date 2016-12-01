import React from 'react';
import { render } from 'react-dom';

import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class AddCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false,
            address: "",
            depositAmount: ""
        }
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
                        <FormGroup>
                            <ControlLabel>Address</ControlLabel>
                            <FormControl type="text" onChange={(e) => this.handleAddressChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Deposit Amount</ControlLabel>
                            <FormControl type="text" onChange={(e) => this.handleDepositAmountChange(e)}/>
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
    
    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    }
    
    handleDepositAmountChange(e) {
        this.setState({ depositAmount: e.target.value });
    }
    
    addCase() {
        this.setState({ showModal: false });
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }
}

export default AddCase;
