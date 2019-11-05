import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import "./styles/global.scss";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const MappedGirls = React.lazy(() => import("./pages/MappedGirls"));
const FollowUps = React.lazy(() => import("./pages/FollowUps"));
const Users = React.lazy(() => import("./pages/Users"));
const AncVisits = React.lazy(() => import("./pages/AncVisits"));
const Login = React.lazy(() => import("./pages/Login"));
const Layout = React.lazy(() => import("./components/Layout"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const Deliveries = React.lazy(() => import("./pages/Deliveries"));

const service = require("./api/services");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoggedIn: false,
      token: ""
    };
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
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
      console.log(response);
      if (error) {
        console.log(error);
        thisApp.setState(
          {
            isLoggedIn: false,
            token: "",
            isLoaded: false
          },
          () => console.log(thisApp.state)
        );
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.removeItem("username");
        sessionStorage.setItem("username", response.username);
        thisApp.setState(
          {
            isLoggedIn: true
          },
          () => console.log(thisApp.state)
        );
        window.location.href = "/dashboard";
        console.log("Authenticated");
      }
    });
  }
  IsAdminLoggedin() {
    const thisApp = this;

    service.verifyToken(function(error, response) {
      console.log(response);
      if (error) {
        console.log(error);
        thisApp.setState(
          {
            isLoggedIn: false,
            token: "",
            isLoaded: false
          },
          () => console.log(thisApp.state)
        );
        sessionStorage.removeItem("token");
        window.location.href = "/";
      } else {
        sessionStorage.removeItem("username");
        sessionStorage.setItem("username", response.username);
        thisApp.setState(
          {
            isLoggedIn: true
          },
          () => console.log(thisApp.state)
        );
        console.log("Authenticated");
      }
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  componentDidMount() {
    // NProgress.done();
    window.addEventListener("offline", function(e) {
      console.log("Offline, please check your internet connection");
      // alertifyjs.error('You are offline, please check your internet connection', 3, function () { console.log('dismissed'); });
    });
  }
  render() {
    return (
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
            path="/"
            render={() =>
              this.state.isLoggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <LoginPage>
                  {" "}
                  <Login />
                </LoginPage>
              )
            }
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
    );
  }
}

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
class LoginPage extends Component {
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

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
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
