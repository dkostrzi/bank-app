import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TransactionsPage.scss';

class TransactionsPage extends Component {

  constructor(props) {
    super(props);
    this.uId = localStorage.getItem('email');
    this._isMounted = false;
    this.token = localStorage.getItem('token');

    //TODO: checking if tokes expired
  }

  componentDidMount() {
    if (this.token == null) {
      this.props.history.replace('/login');

    }
  }

  render() {
    return (
      <div className="TransactionsDashboard">
        
      </div>
    );
  }
}

export default connect(null,null)(TransactionsPage);
