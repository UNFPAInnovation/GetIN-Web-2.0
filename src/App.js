import React, { Component, Suspense } from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Seo from './components/Seo';
import './styles/global.scss';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const Login = React.lazy(() => import('./pages/Login'));
const Layout = React.lazy(() => import('./components/Layout'));
const NotFound = React.lazy(() => import('./components/NotFound'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoggedIn:false
    }
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  componentDidMount() {
    // NProgress.done();
    window.addEventListener('offline', function (e) {
      console.log('Offline, please check your internet connection');
      // alertifyjs.error('You are offline, please check your internet connection', 3, function () { console.log('dismissed'); });
    });
  }
  render() {
  return (
  <BrowserRouter basename="/">

     <Switch>

        <Route exact path="/dashboard" render={() => (
          <SF>

            <Seo title="GetIn Dashboard" description="" keywords=""/>

            <HomePage />
            
          </SF>
        )} />
         <Route
            exact
            path="/"
            render={() =>
              this.state.isLoggedIn ? <Redirect to="/dashboard" /> : 
              <LoginPage> <Login /></LoginPage>
            }
          />
        <Route render={() => (
          <SF>
            <Seo title="Not found" description="We are sorry the page you are looking for was not found" 
            keywords=""
             />
            <NotFound /></SF>
        )} />

      </Switch>

  </BrowserRouter>
  );
  }
}

class SF extends Component {
  render() {
    return (
      <ScrollToTop>
        <ErrorBoundary>
          <Suspense fallback={<div className="loading text-center">
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="spacer"></div>
            {/* <Logo/> */}
          <span>Loading...</span></div>}>
            <Layout>
              {this.props.children}
            </Layout>
          </Suspense>
        </ErrorBoundary>
      </ScrollToTop>
    )
  }
}
class LoginPage extends Component {
  render() {
    return (
      <ScrollToTop>
        <ErrorBoundary>
          <Suspense fallback={<div className="loading text-center">
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="spacer"></div>
            {/* <Logo/> */}
          <span>Loading...</span></div>}>
              {this.props.children}
          </Suspense>
        </ErrorBoundary>
      </ScrollToTop>
    )
  }
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      let reloadState = window.history.state || {};
      var reloadCount = reloadState.reloadCount || 0;
      if (performance.navigation.type === 1) { // Reload
        reloadState.reloadCount = ++reloadCount;
        window.history.replaceState(reloadState, null, document.URL);
    } else if (reloadCount) {
        delete reloadState.reloadCount;
        reloadCount = 0;
        window.history.replaceState(reloadState, null, document.URL);
    }
    if (reloadCount >= 3) {
        // Now, do whatever you want...
        console.log(reloadCount);
        window.history.replaceState(0, null, document.URL);
        console.log('The page was reloaded more than three times!');
    }else{
      setTimeout(function(){
          window.location.reload(true);
        },5000);
    }

      // setTimeout(function(){
      //   window.location.reload(true);
      // },5000);
      return (<React.Fragment>
        <div className="container-custom text-center">
          <h1 className="page-header text-center">Something went wrong.</h1>
          <a className="btn btn-primary text-center" href="/">Reload</a>
        </div>
      </React.Fragment>
      );
    }else{
      return this.props.children;
    }
    
  }
}

export default App;
