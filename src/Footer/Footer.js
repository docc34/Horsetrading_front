import './Footer.css';
import Nav from 'react-bootstrap/Nav'
import { useTranslation } from 'react-i18next';

const Footer = ()=>{
    const {t} = useTranslation();

    return(
    <div className="footerMainDiv">
        <div className='footerTitleDiv'>
            <a href='/' className='footerTitle'>Horsetrading</a>
        </div>

        <div className="footerContentMainDiv">
            <div className='footerContactsDiv'>
                <h3>{t("footerContacts")}</h3>
                <p>{t("footerCEO")}: Eemeli Antikainen</p>
                <p>{t("email")}: antitechofficial@gmail.com</p>
                <p>Instagram: @antitechofficial</p>
            </div>
            <div className='footerLinksDiv'>
                <h3 className='footerLinksTitle'>{t("footerLinks")}</h3>
                <Nav  className="flex-column">
                    <Nav.Link href="/">{t("home")}</Nav.Link>
                    <Nav.Link href="/AuctionController">{t("footerControlPage")}</Nav.Link>
                    <Nav.Link href="/Privacypolicy">{t("privacyPolicyTitle")}</Nav.Link>
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