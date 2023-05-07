import './UserEditModal.css'
import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { useCookies } from 'react-cookie';

const UserEditModal = ({user}) => {
    const [cookies] = useCookies(['token']);
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [usernameModify, setUsernameModify] = useState(user.companyName);
    const [descriptionModify, setDescriptionModify] = useState(user.description)

    const modifyUserProfile = async()=>{
        try{
            if(usernameModify != ""){
                const options = {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${cookies.token}` },
                    body:JSON.stringify({
                        CompanyName: usernameModify,
                        Description: descriptionModify,
                    })
                }
                await fetch("https://horsetradingapidev.azurewebsites.net/api/Profiles/"+user.id, options);
                window.location.reload();
            }
        }
        catch(e){
            console.log(e);      
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsernameModify('');
        setDescriptionModify('');
      };

    return (
        <>
        <button className='dropDownButton' onClick={handleShow}>
            Edit profile
        </button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="ModalHeader" >
                <Modal.Title>Edit profile</Modal.Title>
                <CloseButton variant="white" className='modalCloseButton' onClick={() => {setShow(false)}}></CloseButton>
            </Modal.Header>
            <Modal.Body className="ModalBody">
            <Form onSubmit={handleSubmit}>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        as="textarea" 
                        type="username"
                        autoFocus
                        onChange={(event) =>
                            setUsernameModify(event.target.value)
                        }
                    >
                    {user.companyName}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        type="description"
                        rows={3}
                        onChange={(event) =>
                            setDescriptionModify(event.target.value)
                        }
                    >
                    {user.description}
                    </Form.Control>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer className='ModalFooter'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={modifyUserProfile}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export {UserEditModal}