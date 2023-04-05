import './Home.css';
import {StoreCell} from '../components/StoreCell'
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = ()=>{
    const[data,setData] = useState([]);
    const uniqueUsers = [];

    const getCellData = async()=>{
        var search = await fetch("https://horsetradingapi.azurewebsites.net/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setData(data);
        }
    }
    useEffect(()=>{
        getCellData();
    },[]);


    const RenderCells = ({companyName}) => {
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

    const MakeUserCell = (d)=>{
        const {companyName} = d.props;
        if (!uniqueUsers.includes(companyName)) { // filtteröidään siten, että käyttäjät näkyvät vain kerran
            uniqueUsers.push(companyName);
            return(
                <div className='user-cell'>
                    <h1>
                        {companyName}
                    </h1>
                    <RenderCells companyName={companyName} />
                </div>
        )}
    }

    return(
    <div className='homeMainDiv'>
        <div className='homeCellsDiv'>
            { 
                data == null || data?.length == 0 ? 
                    <div className='homeSpinnerDiv'>
                        <Spinner variant="light" animation="border" />
                    </div> 
                :
                <CardGroup>
                   
                    {data.map(item => {
                        return (
                            <MakeUserCell props={item}/>
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