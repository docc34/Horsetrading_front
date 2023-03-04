import './Footer.css';
import Nav from 'react-bootstrap/Nav'
const Footer = ()=>{
    return(
    <div className="footerMainDiv">
        <a href='/' className='footerTitle'>Antitech</a>

        <div className="footerContentMainDiv">
            <div >
                <h3>Contacts</h3>
                <p>Creator: Eemeli Antikainen</p>
                <p>Phonenumber: +358409606973</p>
                <p>Email: antitechofficial@gmail.com</p>
            </div>
            <div className='footerLinksDiv'>
                <h3 className='footerLinksTitle'>Links</h3>
                <Nav  className="flex-column">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/AuctionController">Control page</Nav.Link>
                </Nav>
            </div>
            <div>
                <h3>Are you interested?</h3>
                <p>If you want to become a seller, with your own auction. Contact me.</p>
            </div>
        </div>
        

    </div>)
}

export{Footer}