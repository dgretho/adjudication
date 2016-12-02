import React from 'react';
import { render } from 'react-dom';

import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class AddCase extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false,
            isLandlordEvidence: true,
            evidence: "",
            evidenceValidationEnabled: false
        };
    }
    
    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={() => this.open()}>Add Evidence</Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add evidence</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup validationState={this.getEvidenceValidationState()}>
                            <ControlLabel>Evidence</ControlLabel>
                            <FormControl type="textarea" 
                                         onChange={this.handleEvidenceChange.bind(this)}
                                         onBlur={this.handleEvidenceChange.bind(this)}/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => this.addEvidence()}>Add Evidence</Button>
                        <Button bsStyle="primary" onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    /* TODO: Make this validation generic */
    getEvidenceValidationState() {
        if(this.state.evidenceValidationEnabled && this.state.evidence.length === 0) {
            return 'error';    
        } else {
            return null;
        }
    }
    
    handleEvidenceChange(e) {
        this.setState({ evidence: e.target.value, evidenceValidationEnabled: true });
    }
    
    addEvidence() {
        // Enable all validation when submitting
        this.setState({ evidenceValidationEnabled: true }, function() {
            if(this.getEvidenceValidationState() === null) {
                this.props.addEvidence({ evidence: this.state.evidence, isLandlordEvidence: this.state.isLandlordEvidence });
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
            isLandlordEvidence: true,
            evidence: "",
            evidenceValidationEnabled: false,
        });
    }
}

export default AddCase;
