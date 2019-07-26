import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.props.onLogout();


  }

  componentDidMount() {
    this.props.history.replace("/login");
  }

  render() {
    return "";
  }

}

const mapDispatchToProps = dispatch =>{
  return{
    onLogout: ()=>dispatch(actions.logout())
  }
};

export default connect(null,mapDispatchToProps)(LogoutPage);
