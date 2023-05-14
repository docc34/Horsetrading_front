import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import './PrivacyPolicyModal.css';
import Nav from 'react-bootstrap/Nav'
import { useLocation } from "react-router-dom";

const PrivacyPolicyModal = ()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    const [show, setShow] = useState(false);
    const {t} = useTranslation();
    const search = useLocation().pathname;

    useEffect(()=>{
        const CheckPrivacyNotice = async ()=>{
            if(await cookies.privacyNoticeRead == "true" ||search.toString() == "/Privacypolicy" ){
                setShow(false);
            }
            else{
                setShow(true);
            }
        }
        CheckPrivacyNotice();
    },[]);
    return(              
    <Modal
        show={show}
        size="sm"
        backdrop="static"
        className='PrivacyPolicyModal'
        keyboard={false}
        >
        <Modal.Header className='ModalHeader' >
        <Modal.Title>{t("privacyPolicyTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='ModalBody'>
            <div className='PrivacyPolicyDescriptionDiv'>
                <p>{t("privacyPolicyModalStatement")}</p>
                <Nav.Link className='PrivacyPolicyModalLink' href="/Privacypolicy">{t("privacyPolicyTitle")}</Nav.Link>
            </div>
        </Modal.Body>
        <Modal.Footer className='ModalFooter'>
        <Button variant="secondary" onClick={()=>{window.location.reload("/PrivacyPolicy")}}>
            {t("no")}
        </Button>
        <Button variant="primary" onClick={()=>{
            setCookie("privacyNoticeRead",true, { path: '/' });
            setShow(false);
            }}>{t("yes")}</Button>
        </Modal.Footer>
    </Modal>
    )
}

export{PrivacyPolicyModal}