import React, {Component} from 'react';

class TransactionsPage extends Component{

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
    return(
      <h3>Transakcja</h3>
    )
  }
}
export default TransactionsPage;
