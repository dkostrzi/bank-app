import React from 'react';
import styles from './Button.module.scss';

const button = (props)=>{

  const style = styles.Button + ' waves-effect waves-light btn-large blue darken-1'

 return (
   <button type={props.type} onClick={props.click} className={style}>{props.children}</button>
 )
}

export default button;
