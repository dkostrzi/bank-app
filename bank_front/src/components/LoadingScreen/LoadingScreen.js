import React from 'react';
import logoImg from '../../assets/images/logo.png';
import Spinner from '../Spinner/Spinner';
import './LoadingScreen.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const loadingScreen = props=>{
  return <div className="LoadingScreen">

    <img src={logoImg} alt="logo"/>
    <CircularProgress style={{color:"#035ee6"}} />
  </div>
};

export default loadingScreen;
