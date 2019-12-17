import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import ReactApexCharts from 'react-apexcharts';
import * as actions from '../../store/actions';

interface IProps {
  transactions: any;
  bill: any;
  onGettingTransaction(token: any, uId: any): void;
  user: any;
}

interface IState {
  options: any;
  series: any;
}
class HomePage extends React.Component<IProps, IState>  {
  uId: any;
  _isMounted: boolean;
  token: any;

  constructor(props: IProps) {
    super(props);
    const id: any = localStorage.getItem('userId');
    this.uId = parseInt(id);
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
          curve: 'smooth',
          colors: ['#035ee6']
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
        data: null,
      }],
    };

    /*if (this.token == null) {
      this.props.history.replace('/login');

    }*/
  }


  public componentDidMount() {
    this._isMounted = true;


    //TODO: better component redirect auth
    this.props.onGettingTransaction(this.token, this.uId);


    const transactions = this.props.transactions; //.expenses.concat(this.props.transactions.incomes);
    transactions.sort((a: any, b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    console.log(transactions);


    let startingFunds = this.props.bill.available_funds;
    let amountMoney = [];

    let xAxis = [];
    xAxis.push('Started');
    transactions.map((item: any) => {
      if (item.id_sender == this.uId) {
        startingFunds = startingFunds + item.amount_money;
      } else {
        startingFunds = startingFunds - item.amount_money;
      }
      xAxis.push(new Date(item.date_time).toDateString());
    });
    amountMoney.push(startingFunds.toFixed(2));

    transactions.map((item: any) => {
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


    console.log('COMPONENT DID MOUNT');


  }

  public componentWillUnmount() {
    this._isMounted = false;
  }


  public render() {

    const billBalance = this.props.bill.available_funds.toFixed(2);


    // console.log(startingFunds);
    return (
      <>
        {this.props.user.id ?
          <div className="HomeDashboard">
            <div className="HomeDashboard__account-balance">
              <div className="HomeDashboard__account-balance__bill">
                <p className="title">Bill number</p>
                <p className="bill">{this.props.bill.account_bill}</p>
                <p className="email">{this.props.user.name} {this.props.user.surname}</p>
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
                {this.state.series[0].data ?
                  // @ts-ignore: Unreachable code error ReactApexCharts not supporting TS
                  <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height={'100%'} className="charts" /> : null}

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

const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
    bill: state.user.bill,
    transactions: state.user.transactions,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGettingTransaction: (token: any, uId: any) => dispatch(actions.gettingTransactions(token, uId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
