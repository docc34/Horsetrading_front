import './Header.css';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';

const Header = ()=>{
    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    return(
    <div className="headerMainDiv">
        <a href='/' className='headerTitle'>Antitech</a>
        {
            cookies?.token != null && cookies?.token != undefined ?
                <Button className='headerLogoutButton' variant="primary" onClick={()=>{removeCookie('token',{ path: '/' }); window.location.reload();}}>logout</Button>
            : null
        }
    </div>)
}

export{Header}