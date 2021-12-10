import React,{Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import App from './App';


test('Main App Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
        <Router>
            <Suspense
                fallback={
                    <h1>Loading....</h1>
                }
            >
                <App/>
            </Suspense>    
        </Router>
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})