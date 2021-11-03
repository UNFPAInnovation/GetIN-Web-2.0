import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import "./styles/global.scss";
// Global State
import {GlobalProvider} from "./context/GlobalState";

const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const MappedGirls = React.lazy(() => import("./pages/MappedGirls"));
const FollowUps = React.lazy(() => import("./pages/FollowUps"));
const Users = React.lazy(() => import("./pages/Users/Users"));
const AncVisits = React.lazy(() => import("./pages/ANC/AncVisits"));
const Login = React.lazy(() => import("./pages/Login"));
const Layout = React.lazy(() => import("./components/Layout"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const Deliveries = React.lazy(() => import("./pages/Deliveries/Deliveries"));
const Messages = React.lazy(() => import("./pages/Messages/Messages"));
const HealthFacilities = React.lazy(() => import("./pages/HealthFacilities"));
const Settings = React.lazy(() => import("./pages/Settings"));

const service = require("./api/services");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoggedIn: false,
      token: ""
    };
    this.IsAdminLoggedin.bind(this);
    this.loginValidate.bind(this);
    if (window.location.pathname == "/") {
      this.loginValidate();
    } else {
      this.IsAdminLoggedin();
    }
  }

  loginValidate() {
    const thisApp = this;
    service.verifyToken(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoggedIn: false,
          token: "",
          isLoaded: false
        });
        sessionStorage.removeItem("token");
      } else {
        thisApp.setState({
          isLoggedIn: true
        });
        window.location.href = "/dashboard";
      }
    });
  }
  IsAdminLoggedin() {
    const thisApp = this;
    service.verifyToken(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoggedIn: false,
          token: "",
          isLoaded: false
        });
        sessionStorage.removeItem("token");
        window.location.href = "/";
      } else {
        sessionStorage.removeItem("username");
        sessionStorage.setItem("username", response.username);
        thisApp.setState({
          isLoggedIn: true
        });
      }
    });
  }
  render() {
    return (
      <GlobalProvider>
        <BrowserRouter basename="/">
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <SF>
                  <Seo title="GetIn Dashboard" description="" keywords="" />

                <Dashboard />
              </SF>
            )}
            />
            <Route
              exact
              path="/anc_visits"
              render={() => (
                <SF>
                  <Seo
                    title="ANC Visits - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <AncVisits />
                </SF>
              )}
            />
            <Route
              exact
              path="/follow_ups"
              render={() => (
                <SF>
                  <Seo
                    title="Follow ups - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <FollowUps />
                </SF>
              )}
            />
            <Route
              exact
              path="/girls"
              render={() => (
                <SF>
                  <Seo
                    title="Mapped girls - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <MappedGirls />
                </SF>
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <SF>
                  <Seo
                    title="Users - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <Users />
                </SF>
              )}
            />
            <Route
              exact
              path="/deliveries"
              render={() => (
                <SF>
                  <Seo
                    title="Deliveries - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <Deliveries />
                </SF>
              )}
            />
            <Route
              exact
              path="/health_facilities"
              render={() => (
                <SF>
                  <Seo
                    title="Health facilities - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <HealthFacilities />
                </SF>
              )}
            />
            <Route
              exact
              path="/"
              render={() =>
                this.state.isLoggedIn ? (
                  // <Redirect to="/dashboard" />
                  //temporary fix until dashboard is sorted
                  <Redirect to="/anc_visits" />
                ) : (
                  <LoadingPage>
                    {" "}
                    <Login />
                  </LoadingPage>
                )
              }
            />
            <Route
              exact
              path="/messages"
              render={() => (
                <SF>
                  <Seo
                    title="Messages - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <Messages />
                </SF>
              )}
            />
            <Route
              exact
              path="/settings"
              render={() => (
                <SF>
                  <Seo
                    title="Settings - GetIn Dashboard"
                    description=""
                    keywords=""
                  />
                  <Settings />
                </SF>
              )}
            />
            <Route
              render={() => (
                <SF>
                  <Seo
                    title="Not found"
                    description="We are sorry the page you are looking for was not found"
                    keywords=""
                  />
                  <NotFound />
                </SF>
              )}
            />
          </Switch>
        </BrowserRouter>
      </GlobalProvider>
    );
  }
}

// suspense Fallback component (SF)
class SF extends Component {
  render() {
    return (
      <ScrollToTop>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="loading text-center">
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                {/* <Logo/> */}
                <span>Loading...</span>
              </div>
            }
          >
            <Layout>{this.props.children}</Layout>
          </Suspense>
        </ErrorBoundary>
      </ScrollToTop>
    );
  }
}
class LoadingPage extends Component {
  render() {
    return (
      <ScrollToTop>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="loading text-center">
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                {/* <Logo/> */}
                <span>Loading...</span>
              </div>
            }
          >
            {this.props.children}
          </Suspense>
        </ErrorBoundary>
      </ScrollToTop>
    );
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

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div className="container-custom text-center">
            <h1 className="page-header text-center">Something went wrong.</h1>
            <a className="btn btn-primary text-center" href="/">
              Reload
            </a>
          </div>
        </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
}

export default App;
