import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import ReactApexCharts from 'react-apexcharts';
import * as actions from '../../store/actions';


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.uId = parseInt(localStorage.getItem('userId'));
    this._isMounted = false;
    this.token = localStorage.getItem('token');

    //TODO: checking if tokes expired


    this.state = {
      options: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },

        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [{
        name: 'Amount money',
        data: [],
      }],
    };
  }


  componentDidMount() {
    this._isMounted = true;
    //TODO: better component redirect auth
    if (this.token == null) {
      this.props.history.replace('/login');

    }

    this.props.onGettingTransaction(this.token,this.uId);


    const transactions = this.props.transactions.expenses.concat(this.props.transactions.incomes);
    transactions.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    console.log(transactions);


    let startingFunds = this.props.bill.available_funds;
    let amountMoney = [];

    let xAxis = [];
    xAxis.push('Started');
    transactions.map(item => {
      if (item.id_sender == this.uId) {
        startingFunds = startingFunds + item.amount_money;
      } else {
        startingFunds = startingFunds - item.amount_money;
      }
      xAxis.push(new Date(item.date_time).toDateString());
    });
    amountMoney.push(startingFunds);

    transactions.map(item => {
      if (item.id_sender == this.uId) {
        startingFunds = startingFunds - item.amount_money;
        amountMoney.push(startingFunds.toFixed(2));
      } else {
        startingFunds = startingFunds + item.amount_money;
        amountMoney.push(startingFunds.toFixed(2));
      }

    });


    console.log('STARING FUNDS', startingFunds);

    /*this.props.transactions.incomes.map(item => {
      startingFunds -= item.amount_money;
    });*/





    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        xaxis: {
          categories: xAxis,
        },
      },
      series: [{
        name: '$ ',
        data: amountMoney,
      }],
    });


  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {

    const billBalance = this.props.bill.available_funds.toFixed(2);


    // console.log(startingFunds);
    return (
      <>
        {this.props.user.id ?
          <div className="HomeDashboard">
            <div className="HomeDashboard__account-balance">
              <div className="HomeDashboard__account-balance__bill">
                <p className="title">Bill</p>
                <p className="bill">{this.props.bill.account_bill}</p>
                <p className="email">{this.props.user.email}</p>
              </div>
              <div className="HomeDashboard__account-balance__funds">
                <p className="title">Balance</p>
                <p className="balance">$ {billBalance}</p>
              </div>
              {/*  <div className="HomePage__container__account-balance__budget">
            budget
          </div>*/}
            </div>
            <div className="HomeDashboard__overview">
              <div className="HomeDashboard__overview__chart">
                <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height={240}
                                 className="charts"/>
                {}
              </div>
            </div>
            <div className="HomeDashboard__additionals">
              additionals
            </div>
          </div> : null
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    bill: state.user.bill,
    transactions: state.transaction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGettingTransaction: (token, uId) => dispatch(actions.gettingTransactions(token, uId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
