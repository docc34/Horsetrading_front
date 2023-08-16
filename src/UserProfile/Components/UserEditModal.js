import './UserEditModal.css'
import React, { useState, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

const UserEditModal = ({user}) => {
    const [cookies] = useCookies(['token']);
    const [showModal, setShowModal] = useState(false);
    const {t} = useTranslation();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [usernameModify, setUsernameModify] = useState(user.companyName);
    const [descriptionModify, setDescriptionModify] = useState(user.description)
    const [shortDescriptionModify, setShortDescriptionModify] = useState(user.shortDescription)
    const [imageFile, setImageFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(user.profilePicUrl);
    const [errors, setErrors] = useState([]);
    const [editModalValidated,setEditModalValidated] = useState(false);
    const [message,setMessage] = useState("");
    
    const handleEditModalSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setEditModalValidated(true);
        }
        else{
            event.preventDefault();

            //Formdata type is used to pass the imagefile to the api.
            const formData = new FormData();

            console.log(event.target.companyName.value);
            formData.append("CompanyName",event.target.companyName.value);
            formData.append("Description",event.target.description.value);
            formData.append("ShortDescription",event.target.shortDescription.value);
            formData.append("ProfilePicture",imageFile);

            modifyUserProfile(formData);

            event.target.reset(); 
            
            setEditModalValidated(false);
        }
    };

    const applyErrorClass= field =>((field in errors && errors[field]===false)?' invalid-field':'');

    const setFileFromInput = e =>{
        if(e.target.files && e.target.files[0]){
            setImageFile(e.target.files[0]);
        }
        else{
            setImageFile(null);
        }
    }

    const deleteSelectedImage = async(imageUrl)=>{
        const options = {
            method: 'DELETE',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Images/User/?ImageUrl="+imageUrl,options);
        var result = await search.json();
        if(result?.status == "Ok"){
            setSelectedImage(null);
            // await fetchImages();
        }
    }


    const modifyUserProfile = async(formData)=>{
        try{
            if(usernameModify != ""){
                const options = {
                    method:'PUT',
                    headers: {"Authorization": `Bearer ${cookies.token}` },
                    body:formData
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

    useEffect(()=>{
        
    },[showModal])

    return (
        <div>
            <button className='dropDownButton' onClick={handleShow}>
                {t("editProfile")}
            </button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Form noValidate validated={editModalValidated} onSubmit={handleEditModalSubmit}>
                    <Modal.Header className="ModalHeader" >
                        <Modal.Title>{t("editProfile")}</Modal.Title>
                        <CloseButton variant="white" className='modalCloseButton' onClick={() => {setShowModal(false)}}></CloseButton>
                    </Modal.Header>
                    <Modal.Body className="ModalBody">
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>{t("companyname")}</Form.Label>

                            <Form.Control
                                as="textarea" 
                                name='companyName'
                                autoFocus
                                rows={1}
                                required
                                value={usernameModify}
                                onChange={(e)=>{setUsernameModify(e.target.value);}}
                            >
                            
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>{t("shortdescription")}</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                type="description"
                                rows={1}
                                required
                                value={shortDescriptionModify}
                                onChange={(e)=>{setShortDescriptionModify(e.target.value);}}
                                name='shortDescription'
                            >
                            {user.shortDescription}
                            </Form.Control>
                            <Form.Text className="text-muted">
                                {t("profileDescriptionText")}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>{t("description")}</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                type="description"
                                rows={3}
                                required
                                value={descriptionModify}
                                onChange={(e)=>{setDescriptionModify(e.target.value);}}
                                name='description'
                            >
                            {user.description}
                            </Form.Control>
                        </Form.Group>

                        <div className='controllerFormImageInputDiv'>
                            <Form.Label>{t("profilePicture")}</Form.Label>
                            <input disabled={selectedImage != null && selectedImage != "" ? true : false} onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")} multiple></input>
                        </div>

                        <div className='auctionControllerModifyImagesDiv'>
                            
                            {selectedImage != null && selectedImage != "" ? 
                            <div>
                                <img className='renderedImage' src={selectedImage}/>
                                <CloseButton variant="white" onClick={()=>{deleteSelectedImage(selectedImage);}}></CloseButton>
                            </div>
                            : 
                            null}

                        </div>
                    </Modal.Body>
                    <Modal.Footer className='ModalFooter'>
                        <Button variant="secondary" onClick={handleClose}>
                            {t("close")}
                        </Button>
                        <Button variant="primary" type="submit">
                            {t("save")}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export {UserEditModal}