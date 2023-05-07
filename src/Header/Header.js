import './Header.css';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';

const Header = ()=>{
    const {t} = useTranslation();
    const [cookies, setCookie,removeCookie] = useCookies(['token']);

    return(
    <div className="headerMainDiv">
        <div className='headerTitleDiv'>
            <a href='/' className='headerTitle'>Horsetrading</a>
            <a href='/' className='headerDefinition'>"Unofficial discussion in which people make agreements that provide both sides with advantages"</a>
        </div>
        <div className='headerButtonGroupDiv'>
            <ButtonGroup className='headerButtonGroup'>
                <Button variant="outline-primary" onClick={()=>{
                    setCookie('locale',"fi",{ path: '/' }); 
                    window.location.reload();}}>
                        <img className='headerCountryIcons' src='https://huutokauppstorage.blob.core.windows.net/huutokauppaimages/fi.svg'/>
                </Button>
                <Button variant="outline-primary" onClick={()=>{
                    setCookie('locale',"en",{ path: '/' }); 
                    window.location.reload();}}>
                        <img className='headerCountryIcons' src='https://huutokauppstorage.blob.core.windows.net/huutokauppaimages/gb.svg'/>
                </Button>
                {
                    cookies?.token != null && cookies?.token != undefined ?
                        <Button className='headerLogoutButton' variant="primary" onClick={()=>{removeCookie('token',{ path: '/' }); window.location.reload();}}> 
                        <img className='headerCountryIcons' src='https://huutokauppstorage.blob.core.windows.net/huutokauppaimages/logout_icon.png'/>
                        </Button>
                    : null
                }
            </ButtonGroup>
        </div>
    </div>)
}

export{Header}