import React from 'react';
import { render } from 'react-dom';
import { Table } from 'react-bootstrap'

import AddEvidence from './addEvidence'

function CaseTableRow(props) {
    function displayEvidence(landlordEvidence, tenantEvidence) {
        var landlordHasEvidence = landlordEvidence && landlordEvidence.length > 0;
        var tenantHasEvidence = tenantEvidence && tenantEvidence.length > 0;
        
        if(!landlordHasEvidence && !tenantHasEvidence) {
            return "No";
        } else if(landlordHasEvidence && !tenantHasEvidence) {
            return "Landlord Only";
        } else if(!landlordHasEvidence && tenantHasEvidence) {
            return "Tenant Only";
        } else {
            return "Yes";
        }
    }
    
    return (
        <tr>
            <td>{props.case.address}</td>
            <td>{props.case.depositAmount}</td>
            <td>{displayEvidence(props.case.landlordEvidence, props.case.tenantEvidence)}</td>
            <td><AddEvidence addEvidence={props.addEvidence}/></td>
        </tr>
    )
}

function CaseTable(props) {
    var rows = props.cases.map(function(step) {
        return (<CaseTableRow case={step} key={step.caseReference} addEvidence={props.addEvidence}/>);
    });
    
    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Deposit Amount</th>
                    <th>Has Evidence</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default CaseTable;
