import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import './PrivacyPolicyModal.css';
import Nav from 'react-bootstrap/Nav'
import { useLocation,useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

const PrivacyPolicyModal = ()=>{
    const [cookies, setCookie] = useCookies(['token']);
    const [show, setShow] = useState(false);
    const {t} = useTranslation();
    const search = useLocation().pathname;
    let navigate = useNavigate();

    //On url change
    useEffect(()=>{
        //scrolls user to the top of the page
        window.scrollTo(0, 0);
        //checks should the privacy policy be showed
        const CheckPrivacyNotice = async ()=>{
            if(await cookies.privacyNoticeRead == "true" ||search.toString() == "/Privacypolicy" || search.toString() == "/"|| search.toString() == "/user"){
                setShow(false);
            }
            else{
                setShow(true);
            }
        }
        CheckPrivacyNotice();

    },[search]);

    return(              
    <Offcanvas 
        show={show}
        placement="bottom"
        scroll={true}
        backdrop={true}
        keyboard={false}
        className="PrivacyPolicyModal"
        >
        <Offcanvas.Header className='ModalHeader' >
            <Offcanvas.Title><h1>{t("privacyPolicyTitle")}</h1></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='ModalBody'>
            <div className='PrivacyPolicyDescriptionDiv'>
                <p>{t("privacyPolicyModalStatement")}</p>
                <Link className='PrivacyPolicyModalLink' to='/Privacypolicy' >{t("privacyPolicyTitle")}</Link>
            </div>
            <div className='PrivacyPolicyButtonsDiv'>
                <Button  variant="secondary" onClick={()=>{navigate("/"); }}>
                    {t("no")}
                </Button>
                <Button className='PrivacyPolicyButtons' variant="primary" onClick={()=>{
                    setCookie("privacyNoticeRead",true, { path: '/' });
                    setShow(false);
                    }}>{t("yes")}
                </Button>
            </div>
        </Offcanvas.Body>


    </Offcanvas >
    )
}

export{PrivacyPolicyModal}