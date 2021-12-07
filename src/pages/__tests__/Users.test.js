import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Users from '../Settings/index';


test('AncVisits Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
    <Suspense
        fallback={
            <h1>Loading....</h1>
        }
    >
        <Users/>
    </Suspense>    
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})