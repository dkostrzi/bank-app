import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SettingsPage.scss';
import AvatarIcon from '@material-ui/icons/PermIdentity';
import Button from '../../components/Button/Button';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import * as actions from '../../store/actions';
import { toastr } from 'react-redux-toastr';

class SettingsPage extends Component {

  constructor(props) {
    super(props);

    this.token = localStorage.getItem('token');
    this.uId = localStorage.getItem('userid');
  }

  state = {
    name: this.props.user.name,
    surname: this.props.user.surname,
    email: this.props.user.email,
    showForm: false,
  };

  showEditForm = () => {
    this.setState({
      ...this.state,
      showForm: true,
    });
  };


  updateUser = (values, actions) => {
    this.props.onStartLoading();
    const data = {

      name: values.name,
      surname: values.surname,
      email: values.email,
    };

    axios.put(`${API_URL}/user`, data, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        console.log(res.data);
        this.props.onStopLoading();
        this.props.updateUserData(this.token,this.uId);
        toastr.success("Success","User updated successfully")
      }).catch(err => {
      console.log(err.response.data);
      this.props.onStopLoading();
    });
  };

  render() {

    let schema = yup.object().shape({
      email: yup.string()
        .email()
        .typeError('Must be a email').required('Required'),
      name: yup.string().required('Required'),
      surname: yup.string().required('Required'),

    });

    const { name, surname, login, email } = this.props.user;

    console.log('SETTINGS', this.props.user);
    return (
      <div className="SettingsPage">
        <div className="SettingsPage__user">
          <div className="SettingsPage__user-avatar">
            <AvatarIcon className="icon"/>
          </div>
          <div className="SettingsPage__user-data">
            <div>Login:<span>{login}</span></div>
            <br/>
            <div><span>{name} {surname}</span></div>
            <div>{email}</div>

            <Button click={this.showEditForm}>Edit data</Button>
          </div>
        </div>

        <div className="SettingsPage__edit-form">
          {this.state.showForm ? <Formik
            initialValues={{
              email: this.props.user.email,
              name: this.props.user.name,
              surname: this.props.user.surname,
            }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              this.updateUser(values, actions);

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
              <form onSubmit={handleSubmit} className="">
                <label>
                  <input type="text" onChange={handleChange} name="name" value={values.name}/>
                  <ErrorMessage name="name" component="span"/>
                </label>
                <label>
                  <input type="text" onChange={handleChange} name="surname" value={values.surname}/>
                  <ErrorMessage name="surname" component="span"/>
                </label>
                <label>
                  <input type="text" onChange={handleChange} name="email" value={values.email}/>
                  <ErrorMessage name="email" component="span"/>
                </label>
                <Button type="submit">Update</Button>
              </form>
            )}
          /> : null}
        </div>

      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartLoading:()=>dispatch(actions.startLoading()),
    onStopLoading:()=>dispatch(actions.stopLoading()),
    updateUserData:(token,uId)=>dispatch(actions.getUserInfo(token,uId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
