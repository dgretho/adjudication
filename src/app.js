/* global fetch */
import React from 'react';
import { render } from 'react-dom';
import Hello from './hello';

class App extends React.Component {
    constructor() {
        super();
        
        var self = this;
        self.state = {
            cases: []
        }
        
        fetch('/cases')
            .then(function(response) {
                if(response.ok) {
                    return response.json();    
                } else {
                    console.log('Network response not ok');
                }
            })
            .then(function(cases) {
                self.setState({
                    cases: cases
                });
            })
            .catch(function(error) {
                console.log('Error occurred: ' + error);
            })
            
    }

    render() {
        return <Hello cases={this.state.cases}/>;
    }
}

render(<App/>, document.getElementById('app'));