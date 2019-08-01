import React from 'react';
import Moment from 'react-moment';

const transactionList = (props)=>{
  return(
    <div className="TransactionsDashboard__data">
      <h3>Transactions</h3>
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
        {props.transaction.map(item => {

          const ifSender = item.id_sender==props.userId?true:false;
          const color = ifSender?"red":"green"
          const style = {
            color:color
          };

          if(ifSender){
            return (<tr style={style} key={item.id}>
              <td>{item.id}</td>
              <td>{item.getRecipientdata.name} {item.getRecipientdata.surname}</td>
              <td>{item.getRecipientdata.bills[0].account_bill} </td>
              {/*<td>{new Date(item.date_time).toTimeString()}</td>*/}
              <td><Moment format="YYYY-MM-DD HH:mm">
                {new Date(item.date_time)}
              </Moment></td>
              <td>$ {item.amount_money.toFixed(2)}</td>
              <td>{item.transfer_title}</td>
            </tr>)
          }
          else{
            return (<tr style={style} key={item.id}>
              <td>{item.id}</td>
              <td>{item.getSenderdata.name} {item.getSenderdata.surname}</td>
              <td>{item.getSenderdata.bills[0].account_bill} </td>
              <td><Moment format="YYYY-MM-DD HH:mm">
                {new Date(item.date_time)}
              </Moment></td>
              <td>$   {item.amount_money.toFixed(2)}</td>
              <td>{item.transfer_title}</td>
            </tr>)
          }


        })}
        </tbody>
      </table>


    </div>
  )
}

export default transactionList;
