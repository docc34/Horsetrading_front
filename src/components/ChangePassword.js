import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import './ChangePassword.css'
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { PasswordVisibilityButton} from './PasswordVisibilityButton'

const ChangePassword = ({user})=>{
    const [cookies] = useCookies(['token']);
    const {t} = useTranslation();
    
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
        <button className='dropDownButton' onClick={()=>{setChangePasswordModalVisibility(true)}}>Change Password</button>

        <Modal show={changePasswordModalVisibility} >
            <Modal.Header className="ModalHeader" >
                <Modal.Title>{t("componentsChangePassword")}</Modal.Title>
                <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setChangePasswordModalVisibility(false);}}></CloseButton>
            </Modal.Header>

            <Modal.Body className="ModalBody">
                <div>
                <Form.Label>{t("componentsCurrentPassword")}</Form.Label>
                    <div className='auctionOfferFormPasswordDiv'>
                        <Form.Control required  type={passwordVisibility} placeholder={t("password")} onBlur={(e)=>{setPassword(e.target.value);}} />
                        <PasswordVisibilityButton passwordVisibility={passwordVisibility} setPasswordVisibility={(e)=>{setPasswordVisibility(e)}}/>
                    </div>
                    <Form.Text className="text-muted">
                        {t("componentsCurrentPasswordDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("componentsCurrentPasswordDisclaimer")}
                    </Form.Control.Feedback>

                </div>

                    <Form.Label>{t("componentsNewPassword")}</Form.Label>
                    <div className='auctionOfferFormPasswordDiv'>
                        <Form.Control required  type={newPasswordVisibility} placeholder={t("password")} onBlur={(e)=>{setNewPassword(e.target.value);}} />
                        <PasswordVisibilityButton passwordVisibility={newPasswordVisibility} setPasswordVisibility={(e)=>{setNewPasswordVisibility(e)}}/>
                    </div>
                    <Form.Text className="text-muted">
                        {t("componentsNewPasswordDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("componentsCurrentPasswordDisclaimer")}
                    </Form.Control.Feedback>

                    {message}
            </Modal.Body>

            <Modal.Footer className="ModalFooter">
                <p className='errorMessage'>{message}</p>
                <Button variant="secondary" onClick={()=>{setChangePasswordModalVisibility(false);}}>
                    {t("cancel")}
                </Button>
                <Button variant="primary" onClick={()=>{changeUserPassword()}}>
                    {t("save")} 
                </Button>
            </Modal.Footer>
        </Modal>
    </div>)
}

export {ChangePassword}