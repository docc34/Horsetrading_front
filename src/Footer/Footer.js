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
                <p>{t("phonenumber")}: +358409606973</p>
                <p>{t("email")}: antitechofficial@gmail.com</p>
            </div>
            <div className='footerLinksDiv'>
                <h3 className='footerLinksTitle'>{t("footerLinks")}</h3>
                <Nav  className="flex-column">
                    <Nav.Link href="/">{t("home")}</Nav.Link>
                    <Nav.Link href="/AuctionController">{t("footerControlPage")}</Nav.Link>
                </Nav>
            </div>
            <div>
                <h3>{t("footerInterested")}</h3>
                <p>{t("footerInterestedText")}</p>
            </div>
        </div>
        
        <div className='footerPlugDiv'>
            <p>{t("footerProduct")} <a href="https://www.antitech.fi">AntiTech</a></p>
        </div>
    </div>)
}

export{Footer}