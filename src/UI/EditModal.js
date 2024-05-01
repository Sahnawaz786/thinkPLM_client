import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './EditModal.module.css';

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

const portalElement=document.getElementById('editoverLays');

const EditModal=(props)=>{
return <Fragment>
    
   {ReactDOM.createPortal(<Backdrop/>,portalElement)} 
   {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,portalElement)}
</Fragment>

};
export default EditModal;

