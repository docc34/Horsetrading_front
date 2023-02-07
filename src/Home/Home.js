import './Home.css';
import {MakeStoreCell} from '../functions';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

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
        return<MakeStoreCell data={x}/>
    });
    return(<div>
        <a href="/Auction?auctionId=1">Esimerkkin huutokauppa</a>
        <br/>
        <a href="/AuctionController">Huutokaupan hallintasivu</a>
        <div className='homeCellsDiv'>
            { 
                data == null || data?.length == 0 ? 
                    <Spinner  animation="border" /> 
                :
                   renderCells
                    
            }
        </div>
        
    </div>);
}

export{Home}