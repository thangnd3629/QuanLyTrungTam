import React, { useState } from "react"
import { Modal, Button } from 'react-bootstrap';
import classes from './AddStudentModal.css'
function AddStudentModal(props) {

    
    
    return (

        <React.Fragment>
            <Modal dialogClassName={classes.mymodal} show={props.show} onHide={props.cancelUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm học sinh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}

                </Modal.Body>
               
            </Modal>
        </React.Fragment>
    );
}
export default AddStudentModal