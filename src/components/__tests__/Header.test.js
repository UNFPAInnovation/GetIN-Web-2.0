import {render,screen} from '@testing-library/react';
import {Suspense} from 'react';
import '@testing-library/jest-dom';
import Header from '../Header';

test('Loads district filter when admin logs in',()=>{
    sessionStorage.setItem('role','manager');
    sessionStorage.setItem('username', 'Roland');

    render(
        <Suspense
            fallback={
                <h1>Loading...</h1>
            }
        >
            <Header/>
        </Suspense>
    );

    expect(screen.queryByTestId('district-filter')).toBeInTheDocument();
    
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');

})

test('District filter disappears when GetIn user (dho,vht,midwife) logs in',()=>{
    sessionStorage.setItem('role','dho');
    sessionStorage.setItem('username', 'Roland');

    render(
        <Suspense
            fallback={
                <h1>Loading...</h1>
            }
        >
            <Header/>
        </Suspense>
    );

    expect(screen.queryByTestId('district-filter')).not.toBeInTheDocument();

    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');

})