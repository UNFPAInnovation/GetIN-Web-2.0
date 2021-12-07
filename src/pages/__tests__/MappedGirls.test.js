import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import MappedGirls from '../MappedGirls';


test('AncVisits Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
    <Suspense
        fallback={
            <h1>Loading....</h1>
        }
    >
        <MappedGirls/>
    </Suspense>    
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})