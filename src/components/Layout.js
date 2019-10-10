import React from 'react';
const Header = React.lazy(() => import('./Header.js'));
const Footer = React.lazy(() => import('./Footer.js'));

export default function Layout(props){
        return(
          <React.Fragment>
            <Header/>
            <div className="content container-fluid">
            <div className="row">
              {props.children}
              </div>
            </div>
            <Footer/>
            </React.Fragment>
        );
}
