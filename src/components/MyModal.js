import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export const MyModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show} onHide={onHide} 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          You have successfully passed the registration
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Great</Button>
      </Modal.Footer>
    </Modal>
  )
}
