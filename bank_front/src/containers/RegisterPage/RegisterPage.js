import React, { Component } from 'react';
import './RegisterPage.scss';
import heroImg from '../../assets/images/bank-hero-nooverlay.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import RegisteredUser from './RegisteredUserInfo/RegisteredUser';
import RegisterForm from './RegisterForm/RegisterForm';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

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
    newUserData: {
      login: '',
      email: '',
      name: '',
      surname: '',
    },

    isRegisterSuccess: false,

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

  registerUser = (values, actions) => {
    console.log(values)
    this.props.onStartLoading();
    axios.post(`${API_URL}/register`, values)
      .then(res => {
        console.log(res.data);
        this.props.onStopLoading();
        actions.setSubmitting(false);
        this.setState({
          isRegisterSuccess: true,
          newUserData: res.data,
        });
      })
      .catch(err => {
        this.props.onStopLoading();
        console.log(err.response.data);
        this.setState({
          error: err.response.data.error,
        });
        actions.setSubmitting(false);
      });
    console.log(values);
  };

  render() {

    const styles = {
      background: `linear-gradient(
      rgba(3, 94, 230, 0.9), 
      rgba(3, 94, 230, 0.5)
    ),url(${heroImg}) `,
    };


    const displayForm = this.state.isRegisterSuccess ? <RegisteredUser user={this.state.newUserData}/> :
      <RegisterForm register={(values, actions) => this.registerUser(values, actions)}
                    birthdayField={(date) => this.handleDate(date)} error={this.state.error}/>;


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

const mapDispatchToProps = dispatch =>{
  return{
    onStartLoading:()=>dispatch(actions.startLoading()),
    onStopLoading:()=>dispatch(actions.stopLoading())
  }
};

export default connect(null, mapDispatchToProps)(RegisterPage);
