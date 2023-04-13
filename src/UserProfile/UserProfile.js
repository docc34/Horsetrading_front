import './UserProfile.css'
import { useLocation } from "react-router-dom";
import { UserContainer } from "../components/UserContainer";
import { useState, useEffect } from "react";
import CardGroup from 'react-bootstrap/CardGroup';

const UserProfile = () => {
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('userId');

    const[containerData,setContainerData] = useState([]);
    const getContainerData = async()=>{
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setContainerData(data);
        }
    }
    useEffect(()=>{
        getContainerData();
    },[]);

    return (
        <div className='main-container'>
            <div className='user-container'>
                <CardGroup>
                {
                    containerData.filter(item => item.id == auctionId).map(id => {
                        return <UserContainer user={id} />
                    })
                }
                </CardGroup>
            </div>
        </div>
    )
}

export {UserProfile}