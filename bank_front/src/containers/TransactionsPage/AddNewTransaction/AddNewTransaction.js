import React, { Component } from 'react';
import { ErrorMessage, Formik } from 'formik';
import Button from '../../../components/Button/Button';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import './AddNewTransaction.scss';
import AddNewTransactionForm from './AddNewTransactionForm/AddNewTransactionForm';
import AddNewTransactionAuthKey from './AddNewTransactionAuthKey/AddNewTransactionAuthKey';
import AddNewTransactionSuccess from './AddNewTransactionSuccess/AddNewTransactionSuccess';


class AddNewTransaction extends Component {

  constructor(props) {
    super(props);
    this.email = localStorage.getItem('email');
    this.token = localStorage.getItem('token');

  }

  state = {
    activePage: 'TRANSACTION_FORM',
    authorization_key: '',
    authKeyVal: '',
    transactionId: null,
  };


  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      authKeyVal: e.target.value,
    });
  };

  checkAuthKey = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/transaction/confirm`, {
      transactionId: this.state.transactionId,
      authKey: this.state.authKeyVal,
    }, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          this.setState({
            ...this.state,
            activePage: 'SUCCESS_TRANSACTION_AUTHORIZED',
          });
          this.props.getTransactions();
        }
      }).catch(err => {
      console.log(err.response.data);
    });


  };

  goToAuthKeyPage = (values,actions) => {

    axios.post(`${API_URL}/transaction/register`, values, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        console.log(res.data);

        this.setState({
          ...this.state,
          activePage: 'AUTH_KEY_FORM',
          /*authorization_key: res.data.authorization_key,*/
          transactionId: res.data.id,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });


  };

  render() {

    let activePage = null;

    if (this.state.activePage === 'TRANSACTION_FORM') {
      activePage = <AddNewTransactionForm email={this.email} token={this.token}
                                          goToAuthKeyPage={(id) => this.goToAuthKeyPage(id)}/>;

    } else if (this.state.activePage === 'AUTH_KEY_FORM') {
      activePage = <AddNewTransactionAuthKey email={this.email} checkAuthKey={this.checkAuthKey} authKeyVal={this.state.authKeyVal}
                                             handleInputChange={this.handleInputChange}/>;
    } else if (this.state.activePage === 'SUCCESS_TRANSACTION_AUTHORIZED') {
      activePage = <AddNewTransactionSuccess/>;
    }

    return (
      <div className="AddNewTransaction">
        {activePage}

      </div>
    );
  }

};

export default AddNewTransaction;
