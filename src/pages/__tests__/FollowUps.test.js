import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import FollowUps from '../FollowUps';


test('Followups Component Loads without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(
    <Suspense
        fallback={
            <h1>Loading....</h1>
        }
    >
        <FollowUps/>
    </Suspense>    
    ,div);
    ReactDOM.unmountComponentAtNode(div);
})