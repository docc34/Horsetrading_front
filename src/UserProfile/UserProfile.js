import './UserProfile.css'
import { useLocation } from "react-router-dom";
import { UserContainer } from "../components/UserContainer";
import { useState, useEffect } from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import { useCookies } from 'react-cookie';
import { UserEditModal } from './Components/UserEditModal';
import { ChangePassword } from "./Components/ChangePassword";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { StoreCell } from '../components/StoreCell';


const UserProfile = () => {
    const search = useLocation().search;
    const searchParamId = new URLSearchParams(search).get('userId');
    const [loggedIn, setLoggedIn] = useState(false);
    const [cookies] = useCookies(['token']);
    const [ownProfile, setOwnProfile] = useState(false);


    const[containerData,setContainerData] = useState([]);
    const getContainerData = async()=>{
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public/?Amount=50&UserId="+searchParamId);
        var data = await search.json();
        if(data != null || data != undefined){
            setContainerData(data[0]);
        }
    }

    //login
    const checkLoginStatus = async()=>{
        if(cookies.token != null){
            const options = {
                method: 'GET',
                headers: { "Authorization": `Bearer ${cookies.token}`}
            }
            let data = await fetch("https://horsetradingapidev.azurewebsites.net/api/Login", options);
            let loggedIn = await data.json();
            if(loggedIn == true){
                setLoggedIn(loggedIn);
            }
        }
        
    }

    const checkIfOwnProfile = async () => {
        if(cookies.token != null){
            const options = {
                method: 'GET',
                headers: { "Authorization": `Bearer ${cookies.token}`}
            }
            const data = await fetch(`https://horsetradingapidev.azurewebsites.net/api/Profiles/Userauthentication/${searchParamId}`, options) 
            if (data.status === 200) {
                setOwnProfile(true);
            }
        }
    }
    

    useEffect(()=>{
        getContainerData();
        checkLoginStatus();
        checkIfOwnProfile();
    },[]);

    return (
        <div className='main-container'>
            <div className='user-container'>
                <div className='user-data-container'>
                    <h1>{containerData.companyName}</h1>
                    <p>{containerData.description}</p>
                    {loggedIn && ownProfile ? 
                        <DropdownButton id="dropdown-basic-button" title="Settings">
                            <UserEditModal user={containerData} />
                            <ChangePassword user={containerData.id}/>
                            <div className='dropDownButton'>
                                <a href="/AuctionController">Control Page</a>
                            </div>
                        </DropdownButton> 
                    :
                    null
                    }
                    <hr/>
                </div>

                {containerData.userAuctionItems != null?
                <CardGroup>
                    {containerData.userAuctionItems.map((item, i) => {
                        
                        return(
                            <div key={i}>
                                <StoreCell data={item} />
                            </div>
                        )
                    })}
                </CardGroup>
                : null}
                    
            </div>
        </div>
    )
}

export {UserProfile}