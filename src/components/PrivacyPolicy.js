import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import './PrivacyPolicy.css';

const PrivacyPolicy = ()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    const [show, setShow] = useState(false);
    const {t} = useTranslation();

    useEffect(()=>{
        const CheckPrivacyNotice = async ()=>{
            if(await cookies.privacyNoticeRead == "true"){
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
        backdrop="static"
        className='PrivacyPolicyModal'
        keyboard={false}
        centered
        >
        <Modal.Header className='ModalHeader' >
        <Modal.Title>{t("privacyPolicyTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='ModalBody'>
            <div className='PrivacyPolicyDescriptionDiv'>
                <p>{t("privacyPolicyDescription1")}</p>
                <p>{t("privacyPolicyDescription2")}</p>
                <p>{t("privacyPolicyDescription3")}</p>
            </div>
        </Modal.Body>
        <Modal.Footer className='ModalFooter'>
        <Button variant="secondary" onClick={()=>{window.location.reload()}}>
            {t("cancel")}
        </Button>
        <Button variant="primary" onClick={()=>{
            setCookie("privacyNoticeRead",true, { path: '/' });
            setShow(false);
            }}>{t("understood")}</Button>
        </Modal.Footer>
    </Modal>
    )
}

export{PrivacyPolicy}