import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../../../utils/api';
import Button from '../../../../components/Button/Button';
import * as yup from 'yup'; // for everything


//TODO:from validation
const addNewTransactionForm = (props) => {

  let schema = yup.object().shape({
    amountMoney: yup.number()
      .positive()
      .min(0.01,"Minimal amount money is $ 0.01")
      .typeError('Must be a number').required('Required'),
    transferTitle:yup.string()
      .required("Required")
  });

  return (
    <div className="AddNewTransaction__transaction-from">
      <Formik
        initialValues={{
          recipientId: props.recipientId,
          amountMoney: '',
          transferTitle: '',
          email: props.email,
        }}
        validationSchema={schema}
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
            <input onClick={props.openDialog} type="text" name="recipientId" value={props.recipientName}
                   placeholder="Recipient id"
                   onChange={handleChange}/>
            <input type="text" name="amountMoney" value={values.amountMoney} placeholder="Amount money"
                   onChange={handleChange}/>
            <ErrorMessage component="span" name="amountMoney"/>
            <input type="text" name="transferTitle" value={values.transferTitle} placeholder="Transfer Title"
                   onChange={handleChange}/>
            <ErrorMessage component="span" name="transferTitle"/>
            <Button type="submit">Send</Button>
          </form>

        )}
      />
    </div>
  );
};

export default addNewTransactionForm;
