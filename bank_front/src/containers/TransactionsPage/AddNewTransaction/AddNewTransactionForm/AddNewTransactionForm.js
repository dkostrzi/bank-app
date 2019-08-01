import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../../../utils/api';
import Button from '../../../../components/Button/Button';

//TODO:from validation
const addNewTransactionForm = (props) => {
  return (
    <div className="AddNewTransaction__transaction-from">
      <Formik
        initialValues={{
          recipientId: '',
          amountMoney: '',
          transferTitle: '',
          email: props.email,
        }}
        validate={values => {
          let errors = {};


          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          props.goToAuthKeyPage(values, actions);

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
            <input type="text" name="recipientId" value={values.recipientId} placeholder="Recipient id"
                   onChange={handleChange}/>
            <input type="text" name="amountMoney" value={values.amountMoney} placeholder="Amount money"
                   onChange={handleChange}/>
            <input type="text" name="transferTitle" value={values.transferTitle} placeholder="Transfer Title"
                   onChange={handleChange}/>
            <Button type="submit">Send</Button>
          </form>

        )}
      />
    </div>
  );
};

export default addNewTransactionForm;
