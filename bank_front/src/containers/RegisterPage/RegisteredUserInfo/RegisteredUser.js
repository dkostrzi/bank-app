import React from 'react';
import { Link } from 'react-router-dom';

const registeredUser = props => {

  //TODO: better styling
  return (
    <div className="new-user-info">
      <h3>User registered successfully</h3>
      <div>
        <div>{props.user.login}</div>
        <div>{props.user.email}</div>
        <div>{props.user.name}</div>
        <div>{props.user.surname}</div>
      </div>
      <Link to="/login">Go to Sign In</Link>
    </div>
  );
};

export default registeredUser;
