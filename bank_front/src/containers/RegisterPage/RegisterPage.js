import React, { Component } from 'react';
import './RegisterPage.scss';
import heroImg from '../../assets/images/bank-hero-nooverlay.png';
import { Link } from 'react-router-dom';
import { DatePicker } from 'react-materialize';

class RegisterPage extends Component {

  state = {
    loginVal: null,
    passwordVal: null,
    emailVal: null,
    nameVal: null,
    surnameVal: null,
    birthdayVal: null,
  };

  componentDidMount() {
    /*  const elems = document.querySelectorAll('.datepicker');
      const instances = M.Datepicker.init(elems, options);*/
  }

  handleInputChange = (e, field) => {
    this.setState({
      ...this.state,
      [field]:e.target.value
    })

  };

  handleDate = (date) => {
    this.setState({
      ...this.state,
      birthdayVal:date
    })
  };

  render() {

    const styles = {
      background: `linear-gradient(
      rgba(3, 94, 230, 0.9), 
      rgba(3, 94, 230, 0.5)
    ),url(${heroImg}) `,
    };

    const options = {
      minDate: new Date(1980, 1, 1),
      yearRange: 80,
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
                  <input type="text" placeholder="Login" onChange={(event) => this.handleInputChange(event, 'loginVal')}/>
                  <input type="password" placeholder="Password" onChange={(event) => this.handleInputChange(event, 'passwordVal')}/>
                  <input type="email" placeholder="Email" onChange={(event) => this.handleInputChange(event, 'emailVal')}/>
                </div>
                <div className="content__form__form__user-info">
                  <input type="text" placeholder="Name" onChange={(event) => this.handleInputChange(event, 'nameVal')}/>
                  <input type="text" placeholder="Surname" onChange={(event) => this.handleInputChange(event, 'surnameVal')}/>
                  <DatePicker placeholder="Birthday" onChange={(date) => this.handleDate(date)} options={options}/>

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
