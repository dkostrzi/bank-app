import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './TransactionsPage.scss';
import { API_URL } from '../../utils/api';

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
  };

  componentDidMount() {
    if (this.token == null) {
      this.props.history.replace('/login');
    }

    axios.get(`${API_URL}/transaction`, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        console.log(res.data);
        const incomes = res.data.filter(transaction => {
          return transaction.id_recipient === this.uId;
        });
        const expenses = res.data.filter(transaction => {
          return transaction.id_sender === this.uId;
        });


        console.log(incomes);
        console.log(expenses);
        this.setState({
          incomes,
          expenses,
        });


      });

  }

  render() {
    return (
      <>
        {this.props.user.id ?
          <div className="TransactionsDashboard">
            <div className="TransactionsDashboard__data">
              <h3>Incomes</h3>
              <table className="responsive-table highlight">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>id payer</th>
                  <th>source bill</th>
                  <th>date</th>
                  <th>amount money</th>
                  <th>transfer title</th>
                </tr>
                </thead>

                <tbody>
                {this.state.incomes.map(item => {
                  return <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.getSenderdata.name} {item.getSenderdata.surname}</td>
                    <td>{item.getSenderdata.bills[0].account_bill} </td>
                    <td>{item.date_time}</td>
                    <td>{item.amount_money}</td>
                    <td>{item.transfer_title}</td>
                  </tr>;
                })}
                </tbody>
              </table>

              <h3>Expenses</h3>
              <table className="responsive-table highlight">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>id payer</th>
                  <th>source bill</th>
                  <th>date</th>
                  <th>amount money</th>
                  <th>transfer title</th>
                </tr>
                </thead>

                <tbody>
                {this.state.expenses.map(item => {
                  return <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.getRecipientdata.name} {item.getRecipientdata.surname}</td>
                    <td>{item.getRecipientdata.bills[0].account_bill} </td>
                    <td>{item.date_time}</td>
                    <td>{item.amount_money}</td>
                    <td>{item.transfer_title}</td>
                  </tr>;
                })}
                </tbody>
              </table>
            </div>
          </div> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(TransactionsPage);
