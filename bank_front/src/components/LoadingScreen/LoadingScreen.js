import React from 'react';
import logoImg from '../../assets/images/logo.png';
import Spinner from '../Spinner/Spinner';
import './LoadingScreen.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const loadingScreen = props=>{
  return <div className="LoadingScreen">

    <img src={logoImg} alt="logo"/>
    <Spinner/>
  </div>
};

export default loadingScreen;
