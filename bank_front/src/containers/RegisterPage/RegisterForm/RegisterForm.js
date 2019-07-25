import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { DatePicker } from 'react-materialize';
import Button from '../../../components/Button/Button';

const registerForm = props => {

  //TODO: better form validation - login only numbers & strong password
  const options = {
    minDate: new Date(1980, 1, 1),
    yearRange: 80,
  };

  return (
    <Formik
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
        props.register(values,actions)
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
              <ErrorMessage component="span" className="error-message" name="login"/>
              <input type="password" name="password" value={values.password} placeholder="Password"
                     onChange={handleChange}/>
              <ErrorMessage component="span" className="error-message" name="password"/>
              <input type="text" name="email" value={values.email} placeholder="Email"
                     onChange={handleChange}/>
              <ErrorMessage component="span" className="error-message" name="email"/>
            </div>
            <div className="content__form__form__user-info">
              <input type="text" name="name" value={values.name} placeholder="Name" onChange={handleChange}/>
              <ErrorMessage component="span" className="error-message" name="name"/>
              <input type="text" name="surname" value={values.surname} placeholder="Surname"
                     onChange={handleChange}/>
              <ErrorMessage component="span" className="error-message" name="surname"/>
              <DatePicker placeholder="Birthday" onChange={(date) => props.birthdayField(date)} options={options}/>
            </div>
          </div>
          <div className="content__form__error">
            {props.error}
          </div>
          <div className="content__form__register-btn">

            <Button disabled={isSubmitting}>Register</Button>
          </div>
        </form>
      )}
    />
  );
};

export default registerForm;
