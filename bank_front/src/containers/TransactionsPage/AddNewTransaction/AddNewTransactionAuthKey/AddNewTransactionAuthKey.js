import React from 'react';
import Button from '../../../../components/Button/Button';

const addNewTransactionAuthKey = props => {
  return (
    <div className="AddNewTransaction__auth-key">
      <h2>We have sent an authorization code to your e-mail {props.email}. <br />Enter it below to confirm the transaction.</h2>
      <form className="" onSubmit={props.checkAuthKey}>
        <input type="text" value={props.authKeyVal} onChange={props.handleInputChange}
               placeholder="Enter auth key"/>
        <Button type="submit" click={props.checkAuthKey}>Send</Button>
      </form>
    </div>
  );
};

export default addNewTransactionAuthKey;
