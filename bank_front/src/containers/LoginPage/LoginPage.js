import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import heroImg from '../../assets/images/bank-hero-nooverlay.jpg';
import Button from '../../components/Button/Button';
import './LoginPage.scss';
import Spinner from '../../components/Spinner/Spinner';
import Logo from '../../components/Logo/Logo';

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

  auth = (e) => {
    e.preventDefault();
    console.log(this.props.isAuthenticated);
    this.props.onAuth(this.state.login, this.state.password);

  };


  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated && this.props.isUserInfo && this.props.isTransactions) {
      authRedirect = <Redirect to="/"/>;
    }

    const styles = {
      background: `linear-gradient(
      rgba(3, 94, 230, 0.9), 
      rgba(3, 94, 230, 0.9)
    ),url(${heroImg}) `,
    };

    let loginBtn = 'Login';
    if (this.props.auth.loading || this.props.userLoading) {
      loginBtn = <Spinner/>;
    } else {
      loginBtn = 'Login';
    }


    const errorsMessage = this.props.auth.error ? <span style={{ color: 'red' }}>{this.props.auth.error}</span> : null;

    //TODO: login container to form - enter will be work
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
              <Logo/>
            </div>

            <div className="login-form__form">
              <small>Demo account <br/>
              Login: 1234 <br/> Password:1234
              </small>
              <form onSubmit={this.auth}>
                <input type="text" value={this.state.login} placeholder="Login"
                       onChange={(event) => this.handleChangeInput(event, 'login')}/>
                <input type="password" value={this.state.password} placeholder="Password"
                       onChange={(event) => this.handleChangeInput(event, 'password')}/>
                {errorsMessage}
                <Button type="submit">{loginBtn}</Button>
                {/*<p> {this.state.login} | <span>{this.state.password}</span></p>*/}
              </form>
            </div>
            <div className="login-form__signup">
              <p>Don't have account? <span><Link to="/register">Sign up</Link></span></p>
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
      userLoading: state.user.loading,
      isUserInfo: state.user.user.id,
      isTransactions:state.user.transactionsLoaded
    };
  }
;


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (login, password) => dispatch(actions.auth(login, password)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
