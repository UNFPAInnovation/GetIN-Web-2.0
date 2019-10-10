import { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

class ScrollToTop extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
    componentDidMount(){
    }
    render() {
      return this.props.children;
    }
  }
  
  export default withRouter(ScrollToTop);