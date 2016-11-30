import React from 'react';
import { render } from 'react-dom';
import { Table } from 'react-bootstrap'

function CaseTableRow(props) {
    return (
        <tr>
            <td>{props.case.address}</td>
            <td>{props.case.depositAmount}</td>
        </tr>
    )
}

function CaseTable(props) {
    var rows = props.cases.map(function(step) {
        return (<CaseTableRow case={step} key={step.caseReference} />);
    });
    
    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Deposit Amount</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default CaseTable;
