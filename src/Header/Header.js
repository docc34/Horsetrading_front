import './Header.css';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Header = ()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    return(
    <div className="headerMainDiv">
        <div className='headerTitleDiv'>
            <a href='/' className='headerTitle'>Horsetrading</a>
            <a href='/' className='headerDefinition'>"Unofficial discussion in which people make agreements that provide both sides with advantages"</a>
        </div>
        <ButtonGroup>
            <Button variant="outline-primary" onClick={()=>{setCookie('locale',"fi",{ path: '/' }); window.location.reload();}}>Finnish</Button>
            <Button variant="outline-primary" onClick={()=>{setCookie('locale',"en",{ path: '/' }); window.location.reload();}}>English</Button>
            {
                cookies?.token != null && cookies?.token != undefined ?
                    <Button className='headerLogoutButton' variant="primary" onClick={()=>{removeCookie('token',{ path: '/' }); window.location.reload();}}>logout</Button>
                : null
            }
        </ButtonGroup>


    </div>)
}

export{Header}