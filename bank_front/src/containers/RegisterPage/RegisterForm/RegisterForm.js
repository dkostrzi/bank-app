import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { DatePicker } from 'react-materialize';
import Button from '../../../components/Button/Button';
import * as yup from 'yup'; // for everything

const registerForm = props => {


  const options = {
    minDate: new Date(1980, 1, 1),
    yearRange: 80,
  };

  let schema = yup.object().shape({
    login: yup.number().positive("Only positive numbers").typeError("It should be a number").required('Required'),
    password: yup.string().required("Required"),
    email: yup.string().email().typeError("Wrong email address").required("Required"),
    name: yup.string().required('Required'),
    surname: yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        email: '',
        name: '',
        surname: '',
      }}
      validationSchema={schema}
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
              <input type="text" name="login" value={values.login} placeholder="Login (i.e. 12345)"
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
              {/*<DatePicker placeholder="Birthday" onChange={(date) => props.birthdayField(date)} options={options}/>*/}
            </div>
          </div>
          <div className="content__form__error">
            {props.error}
          </div>
          <div className="content__form__register-btn">

            <Button type="submit" disabled={isSubmitting}>Register</Button>
          </div>
        </form>
      )}
    />
  );
};

export default registerForm;
