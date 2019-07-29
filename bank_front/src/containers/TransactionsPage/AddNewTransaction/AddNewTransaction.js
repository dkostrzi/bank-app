import React,{Component} from 'react';
import { ErrorMessage, Formik } from 'formik';
import Button from '../../../components/Button/Button';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import './AddNewTransaction.scss'


class AddNewTransaction extends Component {

  constructor(props){
    super(props);

    this.token = localStorage.getItem('token');

  }

  state={
    activePage:'TRANSACTION_FORM'
  };



  render() {

    const activePage = this.state.activePage==='TRANSACTION_FORM'?<Formik
      initialValues={{
        recipientId:'',
        amountMoney:'',
        transferTitle:''
      }}
      validate={values => {
        let errors = {};


        return errors;
      }}
      onSubmit={(values, actions) => {
        console.log(values)
        axios.post(`${API_URL}/transaction/register`,values,{
          headers: {
            Authorization: `JWT ${this.token}`,
          },
        })
          .then(res=>{
            console.log(res.data);
            this.setState({
              activePage:'AUTH_KEY_FORM'
            })
          })
          .catch(err=>{
            console.log(err);
          })

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
          <input type="text" name="recipientId" value={values.recipientId} placeholder="recipientId" onChange={handleChange}/>
          <input type="text" name="amountMoney" value={values.amountMoney} placeholder="amountMoney" onChange={handleChange}/>
          <input type="text" name="transferTitle" value={values.transferTitle} placeholder="transferTitle" onChange={handleChange}/>
          <Button type="submit">Send</Button>
        </form>
      )}
    />:
      <div>
        <input type="text" placeholder="enter auth key"/>
        <Button>Accept</Button>
      </div>;


    return (
      <div className="AddNewTransaction">
        {activePage}

      </div>
    );
  }

};

export default AddNewTransaction
