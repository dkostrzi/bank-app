import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.uId = localStorage.getItem('email');

    this.state = {
      availableFunds:0
    }
  }

  componentDidMount() {
    axios.get(`${API_URL}/bill`,{
      headers:{
        Authorization:`JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          availableFunds:res.data.available_funds
        })
      });
  }


  render() {
    return (
      <>
        <h1>HOME PAGE</h1>
        {this.uId}
        <br/>
        {this.state.availableFunds}
      </>
    );
  }
}

export default HomePage;
