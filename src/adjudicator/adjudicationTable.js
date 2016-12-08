import React from 'react';
import { render } from 'react-dom';
import { Table } from 'react-bootstrap'

function AdjudicationTableRow(props) {
    return (
        // TODO: Set style using a class
        <tr onClick={props.onClick} style={{cursor: 'pointer'}}>
            <td>{props.case.address}</td>
            <td>{props.case.depositAmount}</td>
        </tr>
    )
}

function AdjudicationTable(props) {
    var rows = props.cases.map(function(step) {
        return (<AdjudicationTableRow case={step} 
                                      key={step.caseReference} 
                                      onClick={() => props.onRowClick(step.caseReference)}/>);
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

export default AdjudicationTable;
