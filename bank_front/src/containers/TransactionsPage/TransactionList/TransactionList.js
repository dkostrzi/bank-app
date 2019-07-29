import React from 'react';

const transactionList = (props)=>{
  return(
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
        {props.transaction.incomes.map(item => {
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
        {props.transaction.expenses.map(item => {
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
  )
}

export default transactionList;
