import React from 'react';
import { Link } from 'react-router-dom';

const addNewTransactionSuccess = props=>{
  return (
    <div className="AddNewTransaction__auth-success">
      <h1>SUCCESS</h1>
      <p><b>Congratulations!</b> Your transaction has been confirmed.<br/> <Link to="/">Click here</Link> to go to the home page</p>
    </div>
  )
};

export default addNewTransactionSuccess;
