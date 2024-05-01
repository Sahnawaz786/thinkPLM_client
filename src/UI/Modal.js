import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop=props=>{
    return <div className={classes.backdrop}/>
}
const ModalOverLay=(props)=>{
return (
<div className={classes.modal}>
    {props.children}
</div>
)
}

const portalElement=document.getElementById('overLays');

const Modal=(props)=>{
return <Fragment>
    
   {ReactDOM.createPortal(<Backdrop/>,portalElement)} 
   {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,portalElement)}
</Fragment>

};
export default Modal;

