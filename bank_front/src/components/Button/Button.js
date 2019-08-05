import React from 'react';
import Button from '@material-ui/core/Button';

const button = (props)=>{

 return (
   <Button variant="contained" disabled={props.disabled} type={props.type} onClick={props.click} color="primary">{props.children}</Button>
 )
};

export default button;
