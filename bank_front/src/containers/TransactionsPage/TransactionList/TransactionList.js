import React, { Component } from 'react';
import Moment from 'react-moment';

class TransactionList extends Component {

  state = {
    searchValue: '',
  };

  handleSearchChange = (e) => {
    this.setState({
      ...this.state,
      searchValue: e.target.value,
    });
  };

  render() {
    let lp = 0;
    return (
      <div className="TransactionsDashboard__data">
        <h3>Transactions</h3>
        <input type="text" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange}/>
        <table className="responsive-table highlight">
          <thead>
          <tr>
            <th>No.</th>
            <th>User</th>
            <th>Bill</th>
            <th>Date</th>
            <th>Amount money</th>
            <th>Transfer title</th>
          </tr>
          </thead>

          <tbody>
          {this.props.transaction
            .filter(item => {
              const ifSender = item.id_sender == this.props.userId ? true : false;
              const phrase = ifSender?`${item.getRecipientdata.name} ${item.getRecipientdata.surname}`:`${item.getSenderdata.name} ${item.getSenderdata.surname}`;
              const accountBill = ifSender?item.getRecipientdata.bills[0].account_bill:item.getSenderdata.bills[0].account_bill
              return phrase.toLowerCase().includes(this.state.searchValue.toLowerCase()) || accountBill.includes(this.state.searchValue);
            })
            .map(item => {

              const ifSender = item.id_sender == this.props.userId ? true : false;
              const color = ifSender ? 'red' : 'green';
              const style = {
                color: color,
              };


              lp++;
              if (ifSender) {
                return (<tr style={style} key={item.id}>
                  <td>{lp}</td>
                  <td>{item.getRecipientdata.name} {item.getRecipientdata.surname}</td>
                  <td>{item.getRecipientdata.bills[0].account_bill} </td>
                  {/*<td>{new Date(item.date_time).toTimeString()}</td>*/}
                  <td><Moment format="YYYY-MM-DD HH:mm">
                    {new Date(item.date_time)}
                  </Moment></td>
                  <td>-{item.amount_money.toFixed(2)} $</td>
                  <td>{item.transfer_title}</td>
                </tr>);
              } else {
                return (<tr style={style} key={item.id}>
                  <td>{lp}</td>
                  <td>{item.getSenderdata.name} {item.getSenderdata.surname}</td>
                  <td>{item.getSenderdata.bills[0].account_bill} </td>
                  <td><Moment format="YYYY-MM-DD HH:mm">
                    {new Date(item.date_time)}
                  </Moment></td>
                  <td>{item.amount_money.toFixed(2)} $</td>
                  <td>{item.transfer_title}</td>
                </tr>);
              }


            })}
          </tbody>
        </table>


      </div>
    );
  }


}

export default TransactionList;
