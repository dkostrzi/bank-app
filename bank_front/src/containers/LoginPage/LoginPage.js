import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import heroImg from '../../assets/images/bank-hero-nooverlay.png';
import logoImg from '../../assets/images/logo.png';

import './LoginPage.scss';
import Spinner from '../../components/Spinner/Spinner';

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

    const styles = {
      background: `linear-gradient(
      rgba(3, 94, 230, 0.9), 
      rgba(3, 94, 230, 0.9)
    ),url(${heroImg}) `,
    };

    const loginBtn = this.props.auth.loading?<Spinner/>:"Login";

    return (
      <>
        {authRedirect}
        <div className="LoginPage">
          <div className="hero" style={styles}>
            <div className="hero__content">
              <h2 className="hero__content__title">Welcome to Bank</h2>
              <p>Join our community that have more than 10000 subscribers and learn new things everyday</p>
              <button className="waves-effect waves-light btn-large blue darken-1">Sign In</button>
            </div>
          </div>
          <div className="login-form">
            <div className="login-form__logo">
              <img src={logoImg} alt="logo"/>
            </div>
            <div className="login-form__form">
              <input type="text" value={this.state.login} placeholder="login"
                     onChange={(event) => this.handleChangeInput(event, 'login')}/>
              <input type="password" value={this.state.password} placeholder="password"
                     onChange={(event) => this.handleChangeInput(event, 'password')}/>
              <button className="waves-effect waves-light btn-large blue darken-1 btn-loading" onClick={this.auth}>
                {loginBtn}
              </button>
              {/*<p> {this.state.login} | <span>{this.state.password}</span></p>*/}
            </div>
            <div className="login-form__signup">
              <p>Don't have account? <span>Sign up</span></p>
            </div>


          </div>
        </div>
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
