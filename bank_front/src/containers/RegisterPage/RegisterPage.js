import React, { Component } from 'react';
import './RegisterPage.scss';
import heroImg from '../../assets/images/bank-hero-nooverlay.png';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {

  render() {

    const styles = {
      background: `linear-gradient(
      rgba(3, 94, 230, 0.9), 
      rgba(3, 94, 230, 0.5)
    ),url(${heroImg}) `,
    };

    return (
      <>
        <div className="RegisterPage">
          <div className="header" style={styles}>
            <h1>Register account</h1>
          </div>
          <div className="content">
            <form className="content__form">
              <div className="content__form__form">
                <div className="content__form__form__account-info">
                  <input type="text" placeholder="Login"/>
                  <input type="password" placeholder="Password"/>
                  <input type="email" placeholder="Email"/>
                </div>
                <div className="content__form__form__user-info">
                  <input type="text" placeholder="Name"/>
                  <input type="text" placeholder="Surname"/>
                  <input type="text" placeholder="Birthday"/>
                </div>
              </div>
              <div className="content__form__register-btn">
                <button className="waves-effect waves-light btn-large blue darken-1">Register</button>
              </div>
            </form>
          </div>
          <footer>
            Already have account? <span><Link to="/login">Sign In</Link></span>
          </footer>
        </div>
      </>
    );
  }
};

export default RegisterPage;
