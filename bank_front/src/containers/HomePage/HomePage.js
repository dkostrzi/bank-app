import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { API_URL } from '../../utils/api';
import './HomePage.scss';

import logoImg from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.uId = localStorage.getItem('email');
    this._isMounted = false;
    this.token = localStorage.getItem('token');

    //TODO: checking if tokes expired
  }


  componentDidMount() {
    this._isMounted = true;
    //TODO: better component redirect auth
    if (this.token == null) {
      this.props.history.replace('/login');

    }


  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {

    const billBalance = this.props.bill.available_funds.toFixed(2);

    return (
      <>

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
            account overview - some funds charts
          </div>
          <div className="HomeDashboard__additionals">
            additionals
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    bill: state.user.bill,
  };
};

export default connect(mapStateToProps, null)(HomePage);
