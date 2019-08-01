import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import './UserList.scss';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.token = localStorage.getItem('token');
    this.uId = localStorage.getItem('userId');
  }

  state = {
    userList: [],
    inputValue:''
  };

  componentDidMount() {
    axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `JWT ${this.token}`,
      },
    })
      .then(res => {

        const userList = res.data.filter(item => {
          return item.id != this.uId;
        });

        this.setState({
          ...this.state,
          userList: userList,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  doesContainPhrase = (inputvalue,phrase)=>{
    return phrase.toLowerCase().includes(inputvalue.toLowerCase());
  };
  handleInputChange=(e)=>{
    this.setState({
      ...this.state,
      inputValue:e.target.value
    })
  }

  render() {
    return (

      <div className="UserList">
        <h3>Select user to send money</h3>
        <input placeholder="Find user" type="text" value={this.state.inputValue} onChange={this.handleInputChange}/>
        <List>
          {this.state.userList
            .filter(item=>this.doesContainPhrase(this.state.inputValue,`${item.name} ${item.surname}`))
            .map(user => {
            return <ListItem button onClick={() => this.props.setRecipientId(user.id, user.name, user.surname)}
                             key={user.id}><ListItemText primary={user.surname} secondary={user.name}/></ListItem>;
          })}
        </List>
        {/* <ul>
          {this.state.userList.map(user => {
            return <li onClick={() => this.props.setRecipientId(user.id, user.name, user.surname)}
                       key={user.id}>{user.name} {user.surname}</li>;
          })}
        </ul>*/}
      </div>

    );
  }
}

export default UserList;
