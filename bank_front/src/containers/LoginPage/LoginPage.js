import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import { API_URL } from '../../utils/api';

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
    this.props.onAuth(this.state.login,this.state.password);
  };

  render() {
    return (
      <>
        <h1>Login Page</h1>
        <input type="text" value={this.state.login} placeholder="login"
               onChange={(event) => this.handleChangeInput(event, 'login')}/>
        <input type="password" value={this.state.password} placeholder="password"
               onChange={(event) => this.handleChangeInput(event, 'password')}/>
        <button onClick={this.auth}>Auth</button>
        <p> {this.state.login} | {this.state.password}</p>
        <p>Is auth: {this.props.isAuthenticated ? 'true' : 'false'}</p>
      </>

    );
  }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
    };
  }
;


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (login,password) => dispatch(actions.auth(login,password)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
