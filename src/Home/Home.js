import './Home.css';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';
import { UserContainer } from '../components/UserContainer';

const Home = ()=>{
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

    const[userData,setUserData] = useState([]);
    const getUserData = async()=>{
        const users = [1,2]
        let dataList = []
        await users.map(async (user) => {
            var search = await fetch(`https://horsetradingapidev.azurewebsites.net/api/Profiles/${user}`);
            var data = await search.json();
            if(data != null || data != undefined){
                dataList.push(data)
            }
        })  
        setUserData(dataList)
    }
    useEffect(()=>{
        getUserData();
    },[]);

    return(
        <div className='homeMainDiv'>
            <div className='homeCellsDiv'>
                { 
                    containerData == null || containerData?.length == 0 ? 
                        <div className='homeSpinnerDiv'>
                            <Spinner variant="light" animation="border" />
                        </div> 
                    :
                    <CardGroup>
                    
                        {userData.map(user => {
                            
                            return (
                                <UserContainer user={user}/>
                            )
                        })}
                        
                    </CardGroup>
                        
                }
            </div>
            <div className='homeProductionDisclaimerDiv'>
                <h1>Site looking empty?</h1>
                <p>In the future this site will be filled with all kinds of beautiful art works to auction, but currently the site is still in production. More items will be posted soon. Sorry for the inconvenience.</p>
            </div>
        </div>
    );
}

export{Home}