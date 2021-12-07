import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Login from '../Login';


test('AncVisits Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
    <Suspense
        fallback={
            <h1>Loading....</h1>
        }
    >
        <Login/>
    </Suspense>    
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})