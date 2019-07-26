import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.scss';
import LoginPage from '../LoginPage/LoginPage';
import * as actions from '../../store/actions';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../HomePage/HomePage';
import Loading from '../../components/Loading/Loading';
import ReduxToastr from 'react-redux-toastr';
import RegisterPage from '../RegisterPage/RegisterPage';
import Nav from '../../components/Nav/Nav';
import TransactionsPage from '../TransactionsPage/TransactionsPage';
import NotFound from '../NotFoundPage/NotFound';
import LogoutPage from '../LogoutPage/LogoutPage';

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
        <Route path="/transactions" exact component={TransactionsPage}/>
        <Route path="/logout" exact component={LogoutPage}/>
        <Route path="*" exact component={NotFound}/>
      </Switch>
    );

    let layout = (
      <div className="App">
        {routes}
      </div>
    );

    if (this.props.isAuth) {
      layout = (
        <div className="App">
          <div className="App__dashboard">
            <Nav/>
            <div className="App__dashboard__container">
              <div className="App__dashboard__container__top-bar">

              </div>
              {routes}
            </div>
          </div>
        </div>
      );
    }

    const loading = this.props.isLoading || this.props.isLoadingUser ? <Loading/> : null;

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
        {layout}
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    isLoading: state.auth.loading,
    isLoadingUser: state.user.loading,
    isUserInfo:state.user.user.id!==null

  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogIn: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
