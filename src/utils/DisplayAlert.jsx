import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../store/UserProvider';
import styles from '../style.module.css';

const DisplayAlert = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const {setChoice,choice,setShowAlert } = useContext(UserContext);

  useEffect(()=>{
     setShowModal(true);
  },[])

  useEffect(()=>{
    setChoice(false);
  },[choice])

  return (
    <div onClick={()=>setShowAlert(false)}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to delete the User ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setChoice(false);setShowAlert(false);handleClose()}}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>{setChoice(true);handleClose();setShowAlert(false)}}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisplayAlert;
