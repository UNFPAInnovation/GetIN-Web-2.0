import React from 'react';
const Header = React.lazy(() => import('./Header.js'));
const SideNav = React.lazy(() => import('./SideNav.js'));

export default function Layout(props) {
  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div id='sideNavBar' className='col-md-2 noPadding'>
          <SideNav />
        </div>
        <div id='detailComponent' className='col-md-10 noPadding'>
          <Header />
          <div className='col-md-12'>{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export function LoadingData() {
  return (
    <React.Fragment>
      <div className='col-md-12 spinner'></div>
    </React.Fragment>
  );
}
