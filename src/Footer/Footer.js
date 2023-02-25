import './Footer.css';
import Nav from 'react-bootstrap/Nav'
const Footer = ()=>{
    return(
    <div className="footerMainDiv">
        <a href='/' className='footerTitle'>Antitech</a>

        <div className="footerContentMainDiv">
            <div >
                <h4>Contacts</h4>
                <p >Creator: Eemeli Antikainen</p>
                <p >Phonenumber: +358409606973</p>
                <p>email: Eemeli.Antikainen@gmail.com</p>
            </div>
            <div className='footerLinksDiv'>
                <h4 className='footerLinksTitle'>Links</h4>
                <Nav  className="flex-column">

                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/AuctionController">Control page</Nav.Link>
                    <Nav.Link href="/Auction?auctionId=1">Example transaction</Nav.Link>
                </Nav>
            </div>
        </div>
        

    </div>)
}

export{Footer}