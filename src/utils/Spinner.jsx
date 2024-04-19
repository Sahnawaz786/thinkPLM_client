import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const SpinnerLoading = () => {
  
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SpinnerLoading;
