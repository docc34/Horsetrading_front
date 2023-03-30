import './Home.css';
import {MakeStoreCell} from '../functions';
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
                            <MakeStoreCell data={item} />
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
    <div className='HomeMainDiv'>
        <div className='homeCellsDiv'>
            { 
                data == null || data?.length == 0 ? 
                    <div className='HomeSpinnerDiv'>
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
    </div>
    );
}

export{Home}