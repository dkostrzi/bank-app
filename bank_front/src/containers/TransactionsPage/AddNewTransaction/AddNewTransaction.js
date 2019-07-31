import React, { Component } from 'react';
import { ErrorMessage, Formik } from 'formik';
import Button from '../../../components/Button/Button';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import './AddNewTransaction.scss';


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

  checkAuthKey = () => {

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
        if(res.data.success){
          this.setState({
            ...this.state,
            activePage:"SUCCESS_TRANSACTION_AUTHORIZED"
          })
          this.props.getTransactions();
        }
      }).catch(err => {
      console.log(err);
    });


  };

  render() {

    let activePage =  null;

    if(this.state.activePage === 'TRANSACTION_FORM'){
      activePage =  (<Formik
        initialValues={{
          recipientId: '',
          amountMoney: '',
          transferTitle: '',
          email:this.email
        }}
        validate={values => {
          let errors = {};


          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values);
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
              console.log(err);
            });

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
          <form onSubmit={handleSubmit}>
            <input type="text" name="recipientId" value={values.recipientId} placeholder="recipientId"
                   onChange={handleChange}/>
            <input type="text" name="amountMoney" value={values.amountMoney} placeholder="amountMoney"
                   onChange={handleChange}/>
            <input type="text" name="transferTitle" value={values.transferTitle} placeholder="transferTitle"
                   onChange={handleChange}/>
            <Button type="submit">Send</Button>
          </form>
        )}
      />)
    }
    else if(this.state.activePage === 'AUTH_KEY_FORM'){
      activePage = (
        <div>
          <input type="text" value={this.state.authKeyVal} onChange={this.handleInputChange}
                 placeholder="enter auth key"/>
          <Button click={this.checkAuthKey}>Accept</Button>
        </div>
      )
    }
    else if(this.state.activePage==='SUCCESS_TRANSACTION_AUTHORIZED'){
      activePage = (
        <div>
          <h1>SUCCESS</h1>
        </div>
      )
    }

    return (
      <div className="AddNewTransaction">
        {activePage}

      </div>
    );
  }

};

export default AddNewTransaction;
