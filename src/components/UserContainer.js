import './UserContainer.css';
import { CardGroup } from 'react-bootstrap';
import { StoreCell } from './StoreCell';
import { useEffect, useState } from 'react';

const UserContainer = ({user})=>{
    const {companyName, id} = user;
    const[data,setData] = useState([]);

    const getContainerData = async()=>{
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setData(data);
        }
    }
    useEffect(()=>{
        getContainerData();
    },[]);
    
    const RenderCells = () => {
        return(
            <CardGroup>
                {data.map((item) => {
                    if(companyName == item.companyName) {
                        return(
                            <StoreCell data={item} />
                        )
                    }
                })}
            </CardGroup>
        )
    }
    

    const route = `/users/${id}`

    return(
        <div className='user-cell'>
            <a href={route}>
                {companyName}
            </a>
            <RenderCells companyName={companyName} />
        </div>
    )
}

export {UserContainer}