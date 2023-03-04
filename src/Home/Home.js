import './Home.css';
import {MakeStoreCell} from '../functions';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = ()=>{
    const[data,setData] = useState([]);

    const getCellData = async()=>{
        var search = await fetch("https://localhost:44371/api/AuctionItems/public");
        var data = await search.json();
        if(data != null || data != undefined){
            setData(data);
        }
    }

    useEffect(()=>{
        getCellData();
    },[]);

    const renderCells = data.map((x)=>{
        
        if(x?.description?.length > 380){
            return(
                <MakeStoreCell data={x} fade={true}/>
            )
        }
        else{
            return(
                <MakeStoreCell data={x} fade={false}/>
            )
        }
    });
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
                   {renderCells}
                </CardGroup>
                    
            }
        </div>
    </div>);
}

export{Home}