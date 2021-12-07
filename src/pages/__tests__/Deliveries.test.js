import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Deliveries from '../Deliveries/Deliveries';


test('Deliveries Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
    <Suspense
        fallback={
            <h1>Loading....</h1>
        }
    >
       <Deliveries/>
    </Suspense>    
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})