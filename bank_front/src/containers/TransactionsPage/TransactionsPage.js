import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import './TransactionsPage.scss';
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
    activePage: 'TRANSACTION_LIST',
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
    this.updateTransactionsData();


  }

  updateTransactionsData = () =>{
    this.props.onUpdateTransactionData(this.token, this.uId);
  };

  render() {

    const activePage = this.state.activePage === 'TRANSACTION_LIST' ?
      <TransactionList userId={this.uId} transaction={this.props.transaction}/> : <AddNewTransaction getTransactions={this.updateTransactionsData}/>;


    return (
      <>
        {this.props.user.id ?
          <div className="TransactionsDashboard">
            <div className="TransactionsDashboard__add-transaction">
              <nav>
                <ul>
                  <li><a href="#" onClick={() => this.changePage('ADD_NEW_TRANSACTION')}>Add new transaction</a></li>
                  <li><a href="#" onClick={() => this.changePage('TRANSACTION_LIST')}>Transaction list</a></li>
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
    transaction: state.user.transactions,
    isTransactionsLoaded:state.user.transactionsLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTransactionData: (token, uId) => dispatch(actions.getUserInfo(token, uId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
