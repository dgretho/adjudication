import React from 'react';
import { render } from 'react-dom';

import { Button, Modal } from 'react-bootstrap';

class MarkForAdjudication extends React.Component {
    constructor() {
        super();
        
        this.state = {
            showModal: false
        };
    }
    
    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={() => this.open()}>Ready For Adjudication</Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure this case is ready for adjudication?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={() => this.addEvidence()}>Yes</Button>
                        <Button bsStyle="primary" onClick={() => this.close()}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    addEvidence() {
        this.props.markForAdjudication();
        this.setState({ showModal: false });
    }
    
    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }
}

export default MarkForAdjudication;
