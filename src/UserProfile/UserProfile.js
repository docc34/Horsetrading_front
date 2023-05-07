import './UserProfile.css'
import { useLocation } from "react-router-dom";
import { UserContainer } from "../components/UserContainer";
import { useState, useEffect } from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import { useCookies } from 'react-cookie';
import { UserEditModal } from '../components/UserEditModal';
import { Button } from 'react-bootstrap';
import { ChangePassword } from "../components/ChangePassword";


const UserProfile = () => {
    const search = useLocation().search;
    const searchParamId = new URLSearchParams(search).get('userId');
    const [loggedIn, setLoggedIn] = useState(false);
    const [cookies] = useCookies(['token']);
    const [ownProfile, setOwnProfile] = useState(false);


    const[containerData,setContainerData] = useState([]);
    const getContainerData = async()=>{
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setContainerData(data);
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
            {loggedIn && ownProfile ? 
                <div className='user-container'>
                    <CardGroup>
                    {
                        containerData.filter(item => item.id == searchParamId).map((id, i) => {
                            return (
                                <div key={i}>
                                    <UserContainer user={id} page='userprofile'/>
                                    <UserEditModal user={id} />
                                    <ChangePassword user={id}/>
                                    <Button href="/AuctionController">Control Page</Button>
                                </div>
                                )})
                    }
                    </CardGroup>
                    
                </div>
            :
                <div className='user-container'>
                    <CardGroup>
                    {
                        containerData.filter(item => item.id == searchParamId).map(id => {
                            return <UserContainer user={id} />
                        })
                    }
                    </CardGroup>
                </div>
            }
        </div>
    )
}

export {UserProfile}