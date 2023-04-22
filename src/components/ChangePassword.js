import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import './ChangePassword.css'
import { useCookies } from 'react-cookie';

const ChangePassword = ({user})=>{
    const [cookies] = useCookies(['token']);
    
    const [changePasswordModalVisibility,setChangePasswordModalVisibility] = useState(false);
    const [message,setMessage] = useState(false);

    const [passwordVisibility,setPasswordVisibility] = useState("password");
    const [password,setPassword] = useState("");
    const [newPasswordVisibility,setNewPasswordVisibility] = useState("password");
    const [newPassword,setNewPassword] = useState("");

    const changeUserPassword = async ()=>{
        if(newPassword != "" && password != "" && newPassword != null && password != null){
            const options = {
                method:'POST',
                headers: { 'Content-Type': 'application/json',"Authorization": `Bearer ${cookies.token}`},
                body:JSON.stringify({
                    email:"email",
                    password: password,
                    newPassword: newPassword
                })
            }

            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Profiles/ChangePassword",options);
            var result = await search.json();
            if(await result?.status == "Ok" ){

                setMessage(result?.message);
            }
            else{
                setMessage(result?.message);
            }
        }
    }
    return(<div>
        <Button onClick={()=>{setChangePasswordModalVisibility(true)}}>Change Password</Button>

        <Modal show={changePasswordModalVisibility} >
            <Modal.Header className="ModalHeader" >
                <Modal.Title>Change password</Modal.Title>
                <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setChangePasswordModalVisibility(false);}}></CloseButton>
            </Modal.Header>

            <Modal.Body className="ModalBody">
                <div>
                <Form.Label>Current password</Form.Label>
                <div className='auctionOfferFormPasswordDiv'>
                    <Form.Control required  type={passwordVisibility} placeholder='Password' onBlur={(e)=>{setPassword(e.target.value);}} />
                        <button type='button' className="btn btn-primary" onClick={()=>{ 
                                if (passwordVisibility === "password") {
                                    setPasswordVisibility("text");
                                    return;
                                }
                                    setPasswordVisibility("password");
                            }}>
                            {passwordVisibility === "password" ? (
                                <svg
                                    width="20"
                                    height="17"
                                    fill="currentColor"
                                    className="bi bi-eye-slash-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            ) : (
                                <svg
                                    width="20"
                                    height="17"
                                    fill="currentColor"
                                    className="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                        Please type in an password.
                    </Form.Control.Feedback>

                    <Form.Text className="text-muted">
                        Give your current password
                    </Form.Text>

                </div>

                    <Form.Label>New password</Form.Label>
                    <div className='auctionOfferFormPasswordDiv'>
                        <Form.Control required  type={newPasswordVisibility} placeholder='Password' onBlur={(e)=>{setNewPassword(e.target.value);}} />
                        <button type='button' className="btn btn-primary" onClick={()=>{ {
                                if (newPasswordVisibility === "password") {
                                    setNewPasswordVisibility("text");
                                    return;
                                }
                                setNewPasswordVisibility("password");
                            }}}>
                            {passwordVisibility === "password" ? (
                                <svg
                                    width="20"
                                    height="17"
                                    fill="currentColor"
                                    className="bi bi-eye-slash-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            ) : (
                                <svg
                                    width="20"
                                    height="17"
                                    fill="currentColor"
                                    className="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                        Please type in an password.
                    </Form.Control.Feedback>

                    <Form.Text className="text-muted">
                        Give the new password
                    </Form.Text>
                    {message}
            </Modal.Body>

            <Modal.Footer className="ModalFooter">
                <p className='errorMessage'>{message}</p>
                <Button variant="secondary" onClick={()=>{setChangePasswordModalVisibility(false);}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={()=>{changeUserPassword()}}>
                    Save 
                </Button>
            </Modal.Footer>
        </Modal>
    </div>)
}

export {ChangePassword}