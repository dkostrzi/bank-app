import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import { API_URL } from '../../utils/api';

import styles from './LoginPage.module.scss';

class LoginPage extends Component {

  state = {
    login: '',
    password: '',
  };

  componentDidMount() {

  }

  handleChangeInput = (e, field) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  auth = () => {
    console.log(this.props.isAuthenticated);
    this.props.onAuth(this.state.login, this.state.password);
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/"/>;
    }

    return (
      <>
        {authRedirect}
        <h1>Login Page</h1>
        <input type="text" value={this.state.login} placeholder="login"
               onChange={(event) => this.handleChangeInput(event, 'login')}/>
        <input type="password" value={this.state.password} placeholder="password"
               onChange={(event) => this.handleChangeInput(event, 'password')}/>
        <button onClick={this.auth}>Auth</button>
        <p> {this.state.login} | <span>{this.state.password}</span></p>
        <p>Is auth: {this.props.isAuthenticated ? 'true' : 'false'}</p>
        <p>Mail: {this.props.userId}</p>

      </>

    );
  }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.email,
      auth: state.auth,
    };
  }
;


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (login, password) => dispatch(actions.auth(login, password)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
