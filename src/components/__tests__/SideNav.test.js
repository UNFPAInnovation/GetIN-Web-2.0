import {render,screen} from '@testing-library/react';
import {Suspense} from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import '@testing-library/jest-dom';
import SideNav from '../SideNav';


test('Users tab disappears when admin logs in',()=>{
    sessionStorage.setItem('role','manager');

    render(
        <Router>
            <Suspense
                fallback={
                    <h1>Loading...</h1>
                }
            >
                <SideNav/>
            </Suspense>
        </Router>
        
    );

    expect(screen.queryByTestId('Users')).not.toBeInTheDocument();
    
    sessionStorage.removeItem('role');
})

test('Users tab appears when GetIn User (vht,dho,midwife) logs in',()=>{
    sessionStorage.setItem('role','dho');

    render(
        <Router>
            <Suspense
                fallback={
                    <h1>Loading...</h1>
                }
            >
                <SideNav/>
            </Suspense>
        </Router>
        
    );

    expect(screen.queryByTestId('Users')).toBeInTheDocument();
    
    sessionStorage.removeItem('role');
})

test('Settings tab appears when Admin User logs in',()=>{
    sessionStorage.setItem('role','manager');

    render(
        <Router>
            <Suspense
                fallback={
                    <h1>Loading...</h1>
                }
            >
                <SideNav/>
            </Suspense>
        </Router>
        
    );

    expect(screen.queryByTestId('Settings')).toBeInTheDocument();
    
    sessionStorage.removeItem('role');
})

test('Settings tab disappears when GetIn User (vht,dho,midwife) logs in',()=>{
    sessionStorage.setItem('role','dho');

    render(
        <Router>
            <Suspense
                fallback={
                    <h1>Loading...</h1>
                }
            >
                <SideNav/>
            </Suspense>
        </Router>
        
    );

    expect(screen.queryByTestId('Settings')).not.toBeInTheDocument();
    
    sessionStorage.removeItem('role');
})