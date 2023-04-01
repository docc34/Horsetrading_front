import './Header.css';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';

const Header = ()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    return(
    <div className="headerMainDiv">
        <div className='headerTitleDiv'>
            <a href='/' className='headerTitle'>Horsetrading</a>
            <a href='/' className='headerDefinition'>"Unofficial discussion in which people make agreements that provide both sides with advantages"</a>
        </div>
        {
            cookies?.token != null && cookies?.token != undefined ?
                <Button className='headerLogoutButton' variant="primary" onClick={()=>{removeCookie('token',{ path: '/' }); window.location.reload();}}>logout</Button>
            : null
        }
    </div>)
}

export{Header}