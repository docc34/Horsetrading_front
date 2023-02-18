import './Footer.css';
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
                <h4>Links</h4>
                <a href="/AuctionController">Control page</a>
                <a href="/Auction?auctionId=1">Example transaction</a>
                <a href="/">Home</a>

            </div>
        </div>
        

    </div>)
}

export{Footer}