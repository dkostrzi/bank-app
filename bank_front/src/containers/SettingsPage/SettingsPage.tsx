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
import User from '../../Models/User.model';
import UserConnector from '../../Connectors/User.connector';

interface IProps {
  user: User,
  onStartLoading(): Function,
  onStopLoading(): Function,
  updateUserData(token: string, uid: string): Function
}

interface IState {
  showForm: boolean
}

class SettingsPage extends React.Component<IProps, IState> {
  private token: any;
  private uId: any;

  constructor(props: IProps) {
    super(props);

    this.token = localStorage.getItem('token');
    this.uId = localStorage.getItem('userid');

    this.state = {
      showForm: false,
    };

    this.updateUser = this.updateUser.bind(this);

  }



  private showEditForm = () => {
    this.setState({
      showForm: true,
    });
  };


  private async updateUser(values: any, actions: any) {
    this.props.onStartLoading();
    const data = {
      name: values.name,
      surname: values.surname,
      email: values.email,
    };
    try {
      const res = await UserConnector.updateUser(data, this.token);
      console.log(res.data);
      this.props.onStopLoading();
      this.props.updateUserData(this.token, this.uId);
      toastr.success("Success", "User updated successfully")
    } catch(error){
      console.log(error.response.data);
      this.props.onStopLoading();
    }
  };

  public render() {

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
            <AvatarIcon className="icon" />
          </div>
          <div className="SettingsPage__user-data">
            <div>Login:<span>{login}</span></div>
            <br />
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
                    <input type="text" onChange={handleChange} name="name" value={values.name} />
                    <ErrorMessage name="name" component="span" />
                  </label>
                  <label>
                    <input type="text" onChange={handleChange} name="surname" value={values.surname} />
                    <ErrorMessage name="surname" component="span" />
                  </label>
                  <label>
                    <input type="text" onChange={handleChange} name="email" value={values.email} />
                    <ErrorMessage name="email" component="span" />
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onStartLoading: () => dispatch(actions.startLoading()),
    onStopLoading: () => dispatch(actions.stopLoading()),
    updateUserData: (token: string, uId: string) => dispatch(actions.getUserInfo(token, uId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
