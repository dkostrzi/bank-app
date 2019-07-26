import React from 'react';
import logoImg from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import './Nav.scss'
import Logo from '../Logo/Logo';

const nav = props =>{
  return(
    <div className="Navigation">
      <div className="Navigation__logo">
        <Logo/>
      </div>
      <nav className="Navigation__menu">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/transactions">Transactions</NavLink></li>
          <li><NavLink to="/settings">Settings</NavLink></li>
          <li><NavLink to="/logout">Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default nav;
