import React from 'react';
import { render } from 'react-dom';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function inputField(props) {
    return (
        <FormGroup validationState={ props.validationState() }>
            <ControlLabel>{ props.label }</ControlLabel>
            <FormControl type="text" 
                         onChange={ props.onChange }
                         onBlur={ props.onChange }/>
        </FormGroup>
    );
}

export default inputField;
