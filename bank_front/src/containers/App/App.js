import React, { Component } from 'react';
import './App.scss';
import LoginPage from '../LoginPage/LoginPage';
import * as actions from '../../store/actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../HomePage/HomePage';
import Loading from '../../components/Loading/Loading';
import ReduxToastr from 'react-redux-toastr';
import RegisterPage from '../RegisterPage/RegisterPage';
import Nav from '../../components/Nav/Nav';
import TransactionsPage from '../TransactionsPage/TransactionsPage';
import NotFound from '../NotFoundPage/NotFound';
import LogoutPage from '../LogoutPage/LogoutPage';
import PrivateRoute from '../privateRoute';
import Spinner from '../../components/Spinner/Spinner';

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
        <PrivateRoute path="/" exact component={HomePage}/>
        <PrivateRoute path="/transactions" exact component={TransactionsPage}/>
        <Route path="/logout" exact component={LogoutPage}/>
        <Route path="*" exact component={NotFound}/>
      </Switch>
    );

    let layout = null;

    if(!this.props.isAuth){
      layout = (
        <div className="App">
          {routes}
        </div>
      );
    }
    else if(this.props.isAuth && this.props.isUserInfo && this.props.isTransactions){
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
    else{
      layout = (
        <Spinner/>
      )
    }

   /* if (this.props.isAuth && this.props.isUserInfo && this.props.isTransactions) {

    } else if(!this.props.isAuth && !this.props.isUserInfo && !this.props.isTransactions) {

    }else{
      layout = null;
    }*/

    const loading = this.props.isLoading || this.props.isLoadingUser ||this.props.loading ? <Loading/> : null;

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
    isTransactions:state.user.transactionsLoaded,
   // isLoadingTransactions:state.transaction.loading,
    isUserInfo: state.user.user.id !== null,
    loading:state.loading.loading


  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogIn: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
