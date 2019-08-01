import React from 'react';
import styles from './Button.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const button = (props)=>{

  const style = styles.Button + ' waves-effect waves-light btn-large blue darken-1'

 return (
   <Button variant="contained" disabled={props.disabled} type={props.type} onClick={props.click} color="primary">{props.children}</Button>
 )
};

export default button;
