import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import styles from './HomePage.module.scss';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.uId = localStorage.getItem('email');
    this._isMounted = false;
    this.token = localStorage.getItem('token');

    //TODO: checking if tokes expired
  }

  state = {
    availableFunds: null,
  };

  componentDidMount() {
    this._isMounted = true;
    //TODO: better component redirect auth
    if (this.token != null) {

      axios.get(`${API_URL}/bill`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },

      })
        .then(res => {
          console.log(res.data);
          if (this._isMounted) {
            this.setState({
              availableFunds: res.data.available_funds,
            });
          }

        });
    } else {
      this.props.history.replace('/login');
    }


  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
      <>
        <div className={styles.HomePage}>
          HomePage
        </div>
      </>
    );
  }
}

export default HomePage;
