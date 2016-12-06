/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';



function Home() {
    return (
        <div className="container">
            <h2>Who are you?</h2>
            <Link to="/caseHandler">A Case Handler</Link>
            {' or '}
            <Link to="/adjudicator">An Adjudicator</Link>
        </div>
    );
}

export default Home;
