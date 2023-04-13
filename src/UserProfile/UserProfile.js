import { useLocation } from "react-router-dom";
import { UserContainer } from "../components/UserContainer";
import { useState, useEffect } from "react";

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
        <div>
            {
                containerData.filter(item => item.id == auctionId).map(id => {
                    return <UserContainer user={id} />
                })
            }
        </div>
    )
}

export {UserProfile}