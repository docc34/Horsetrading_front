import './UserProfile.css'
import { useLocation } from "react-router-dom";
import { UserContainer } from "../components/UserContainer";
import { useState, useEffect } from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import { useCookies } from 'react-cookie';
import { UserEditModal } from '../components/UserEditModal';


const UserProfile = () => {
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('userId');
    const [loggedIn, setLoggedIn] = useState(false);
    const [cookies] = useCookies(['token']);


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

    useEffect(()=>{
        getContainerData();
        checkLoginStatus();
    },[]);


    return (
        <div className='main-container'>
            {loggedIn == true ? 
                <div className='user-container'>

                
                    <a href="/AuctionController">Control Page</a>
                    <CardGroup>
                    {
                        containerData.filter(item => item.id == auctionId).map(id => {
                            return (
                                <div>
                                    <UserContainer user={id} />
                                    <UserEditModal user={id} />
                                </div>
                                )})
                    }
                    </CardGroup>
                    
                </div>
            :
                <div className='user-container'>
                    <CardGroup>
                    {
                        containerData.filter(item => item.id == auctionId).map(id => {
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