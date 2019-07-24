import React, { Component } from 'react';
import './RegisterPage.scss';
import heroImg from '../../assets/images/bank-hero-nooverlay.png';
import { Link } from 'react-router-dom';
import { DatePicker } from 'react-materialize';
import Button from '../../components/Button/Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import RegisteredUser from './RegisteredUserInfo/RegisteredUser';

class RegisterPage extends Component {

  state = {
    form: {
      loginVal: null,
      passwordVal: null,
      emailVal: null,
      nameVal: null,
      surnameVal: null,
      birthdayVal: null,
    },
    error: null,
    newUserData:{
      login:'',
      email:'',
      name:'',
      surname:''
    },

    isRegisterSuccess:false

  };

  componentDidMount() {
    /*  const elems = document.querySelectorAll('.datepicker');
      const instances = M.Datepicker.init(elems, options);*/
  }

 /* handleInputChange = (e, field) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [field]: e.target.value,
      },

    });

  };*/

  handleDate = (date) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        birthdayVal: date,
      },

    });
  };

  registerUser = (data) => {

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

    const displayForm = this.state.isRegisterSuccess?<RegisteredUser user={this.state.newUserData}/>: <Formik
      initialValues={{
        login: '',
        password: '',
        email: '',
        name: '',
        surname: '',
      }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.login) {
          errors.login = 'Login is Required';
        }

        if (!values.password) {
          errors.password = 'Password is Required';
        }
        if (!values.name) {
          errors.name = 'Name is Required';
        }

        if (!values.surname) {
          errors.surname = 'Surname is Required';
        }

        return errors;
      }}
      onSubmit={(values, actions) => {
        //this.registerUser(values);
        axios.post(`${API_URL}/register`, values)
          .then(res => {
            console.log(res.data);
            actions.setSubmitting(false);
            this.setState({
              isRegisterSuccess:true,
              newUserData:res.data
            })
          })
          .catch(err => {
            console.log(err.response.data);
            this.setState({
              error: err.response.data.error,
            });
            actions.setSubmitting(false);
          });
        console.log(values);
      }}
      render={({
                 values,
                 errors,
                 status,
                 touched,
                 handleBlur,
                 handleChange,
                 handleSubmit,
                 isSubmitting,
               }) => (
        <form onSubmit={handleSubmit} className="content__form">
          <div className="content__form__form">
            <div className="content__form__form__account-info">
              <input type="text" name="login" value={values.login} placeholder="Login"
                     onChange={handleChange}/>
              <ErrorMessage component="span" name="login"/>
              <input type="password" name="password" value={values.password} placeholder="Password"
                     onChange={handleChange}/>
              <ErrorMessage component="span" name="password"/>
              <input type="text" name="email" value={values.email} placeholder="Email"
                     onChange={handleChange}/>
              <ErrorMessage component="span" name="email"/>
            </div>
            <div className="content__form__form__user-info">
              <input type="text" name="name" value={values.name} placeholder="Name" onChange={handleChange}/>
              <ErrorMessage component="span" name="name"/>
              <input type="text" name="surname" value={values.surname} placeholder="Surname"
                     onChange={handleChange}/>
              <ErrorMessage component="span" name="surname"/>
              <DatePicker placeholder="Birthday" onChange={(date) => this.handleDate(date)} options={options}/>
            </div>
          </div>
          <div className="content__form__error">
            {this.state.error}
          </div>
          <div className="content__form__register-btn">

            <Button disabled={isSubmitting}>Register</Button>
          </div>
        </form>
      )}
    />


    return (
      <>
        <div className="RegisterPage">
          <div className="header" style={styles}>
            <h1>Register account</h1>
          </div>
          <div className="content">
            {displayForm}
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
