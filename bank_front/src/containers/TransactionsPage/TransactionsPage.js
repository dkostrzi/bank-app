import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions';
import './TransactionsPage.scss';
import { API_URL } from '../../utils/api';
import { NavLink } from 'react-router-dom';
import TransactionList from './TransactionList/TransactionList';
import AddNewTransaction from './AddNewTransaction/AddNewTransaction';

class TransactionsPage extends Component {

  constructor(props) {
    super(props);
    this.uId = parseInt(localStorage.getItem('userId'));
    this._isMounted = false;
    this.token = localStorage.getItem('token');

    //TODO: checking if tokes expired
  }

  state = {
    incomes: [],
    expenses: [],
    transactions: [],
    activePage: 'ADD_NEW_TRANSACTION',
  };

  changePage = (page) => {
    this.setState({
      ...this.state,
      activePage: page,
    });
  };

  componentDidMount() {
    if (this.token == null) {
      this.props.history.replace('/login');
    }
    this.getTransactions();


  }

  getTransactions = () =>{
    this.props.onGettingTransaction(this.token, this.uId);
  };

  render() {

    const activePage = this.state.activePage === 'TRANSACTION_LIST' ?
      <TransactionList transaction={this.props.transaction}/> : <AddNewTransaction getTransactions={this.getTransactions}/>;


    return (
      <>
        {this.props.user.id ?
          <div className="TransactionsDashboard">
            <div className="TransactionsDashboard__add-transaction">
              <nav>
                <ul>
                  <li><a onClick={() => this.changePage('ADD_NEW_TRANSACTION')}>Add new transaction</a></li>
                  <li><a onClick={() => this.changePage('TRANSACTION_LIST')}>Transaction list</a></li>
                </ul>
              </nav>
            </div>
            {activePage}
          </div> : null}
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user.user,
    transaction: state.transaction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGettingTransaction: (token, uId) => dispatch(actions.gettingTransactions(token, uId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
