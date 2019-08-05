import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import './AddNewTransaction.scss';
import AddNewTransactionForm from './AddNewTransactionForm/AddNewTransactionForm';
import AddNewTransactionAuthKey from './AddNewTransactionAuthKey/AddNewTransactionAuthKey';
import AddNewTransactionSuccess from './AddNewTransactionSuccess/AddNewTransactionSuccess';
import UserList from '../../../components/UserList/UserList';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { toastr } from 'react-redux-toastr';

class AddNewTransaction extends Component {

  constructor(props) {
    super(props);
    this.email = this.props.user.email;
    this.token = localStorage.getItem('token');

  }

  state = {
    activePage: 'TRANSACTION_FORM',

    authorization_key: '',
    authKeyVal: '',
    transactionId: null,
    openDialog: false,
    recipientId: '',
    recipientName: '',
  };


  handleOpenDialog = () => {
    this.setState({
      ...this.state,
      openDialog: true,
    });
  };
  handleCloseDialog = () => {
    this.setState({
      ...this.state,
      openDialog: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      authKeyVal: e.target.value,
    });
  };

  checkAuthKey = (e) => {
    e.preventDefault();
    this.props.onLoadingStart();
    axios.post(`${API_URL}/transaction/confirm`, {
      transactionId: this.state.transactionId,
      authKey: this.state.authKeyVal,
    }, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        this.props.onLoadingStop();
        console.log(res.data);
        if (res.data.success) {
          this.setState({
            ...this.state,
            activePage: 'SUCCESS_TRANSACTION_AUTHORIZED',
          });
          this.props.getTransactions();
        }
      }).catch(err => {
      this.props.onLoadingStop();
      console.log(err.response.data);

    });


  };

  goToAuthKeyPage = (values, actions) => {
    this.props.onLoadingStart();
    const data = {
      ...values,
      recipientId: this.state.recipientId,
    };
    console.log(data);
    axios.post(`${API_URL}/transaction/register`, data, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {
        console.log(res.data);
        this.props.onLoadingStop();
        this.setState({
          ...this.state,
          activePage: 'AUTH_KEY_FORM',
          /*authorization_key: res.data.authorization_key,*/
          transactionId: res.data.id,
        });
      })
      .catch(err => {
        this.props.onLoadingStop();
        console.log(err.response.data);
        toastr.error('Error', err.response.data.message);
      });
  };

  setRecipientId = (id, name, surname) => {
    console.log(id, name, surname);
    this.setState({
      ...this.state,
      recipientId: id,
      openDialog: false,
      recipientName: `${name} ${surname}`,
    });
  };

  render() {

    let activePage = null;

    if (this.state.activePage === 'TRANSACTION_FORM') {
      activePage = <AddNewTransactionForm recipientId={this.state.recipientId} recipientName={this.state.recipientName}
                                          openDialog={this.handleOpenDialog} email={this.email}
                                          token={this.token}
                                          goToAuthKeyPage={(id) => this.goToAuthKeyPage(id)}/>;

    } else if (this.state.activePage === 'AUTH_KEY_FORM') {
      activePage =
        <AddNewTransactionAuthKey email={this.email} checkAuthKey={this.checkAuthKey} authKeyVal={this.state.authKeyVal}
                                  handleInputChange={this.handleInputChange}/>;
    } else if (this.state.activePage === 'SUCCESS_TRANSACTION_AUTHORIZED') {
      activePage = <AddNewTransactionSuccess/>;
    }

    return (
      <>
        <div className="AddNewTransaction">
          {activePage}

        </div>
        <Dialog fullScreen open={this.state.openDialog} onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title">
          <AppBar style={{ position: 'relative' }}>
            <Toolbar style={{ backgroundColor: '#035ee6' }}>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseDialog} aria-label="close">
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <UserList setRecipientId={(id, name, surname) => this.setRecipientId(id, name, surname)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingStart: () => dispatch(actions.startLoading()),
    onLoadingStop: () => dispatch(actions.stopLoading()),
  };
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
    ;
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTransaction);
