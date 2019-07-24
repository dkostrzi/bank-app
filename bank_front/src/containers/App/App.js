import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import * as actions from '../../store/actions';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../HomePage/HomePage';
import Loading from '../../components/Loading/Loading';
import ReduxToastr from 'react-redux-toastr'
import RegisterPage from '../RegisterPage/RegisterPage';

class App extends Component {


  componentDidMount() {
    this.props.tryAutoLogIn();
    /*if (!this.props.isAuth) {
      this.props.history.replace('/login');
    }*/
  }

  render() {


    let routes = (
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/" exact component={HomePage}/>
      </Switch>
    );

    const loading = this.props.isLoading? <Loading/>:null;

    return (
      <>
        {loading}
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"

          closeOnToastrClick/>
        <div className="App">
          {routes}
        </div>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    isLoading:state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogIn: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));