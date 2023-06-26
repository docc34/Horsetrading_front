import './Footer.css';
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = ()=>{
    const {t} = useTranslation();

    return(
    <div className="footerMainDiv" >
        <div className='footerTitleDiv'>
            <a href='/' className='footerTitle'>Horsetrading</a>
        </div>

        <div className="footerContentMainDiv">
            <div className='footerContactsDiv'>
                <h3>{t("footerContacts")}</h3>
                <p>{t("email")}: antitechofficial@gmail.com</p>
                <p>Instagram: @antitechofficial</p>
            </div>
            <div className='footerLinksDiv'>
                <h3 className='footerLinksTitle'>{t("footerLinks")}</h3>
                <Nav  className="flex-column">
                    <Nav.Link><Link to="/">{t("home")}</Link></Nav.Link>
                    <Nav.Link><Link to="/AuctionController">{t("footerControlPage")}</Link></Nav.Link>
                    <Nav.Link><Link to="/Privacypolicy">{t("privacyPolicyTitle")}</Link></Nav.Link>
                </Nav>
            </div>
            <div>
                <h3>{t("footerInterested")}</h3>
                <p>{t("footerInterestedText")}</p>
            </div>
        </div>
        
        <div className='footerPlugDiv'>
            <Nav><p>{t("footerProduct")} </p><Nav.Link className='FooterAntiTechLink' href="https://www.antitech.fi">AntiTech</Nav.Link ></Nav>
        </div>
    </div>)
}

export{Footer}