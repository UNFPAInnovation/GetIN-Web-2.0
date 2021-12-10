import {render} from '@testing-library/react';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard/Dashboard';

test('Dashboard loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard/>, div);
    ReactDOM.unmountComponentAtNode(div);  
});


