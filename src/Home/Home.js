import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react'

import './Home.css';

const Home = ()=>{
    const [enableSelection, setEnableSelection] = useState(false);
    const [auctioneers, setAuctioneers] = useState([]);
    const [currentAuctionItem, setCurrentAuctionItem] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [price, setPrice] = useState(0);
    
    const [message, setMessage] = useState("");
    

    const postAuction = async ()=>{
        if(email != "" && price != 0){
            const options = {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    Username: username, 
                    Email: email,
                    Price: price,
                    Password: password,
                    AuctionItemId: currentAuctionItem.id
                })
            }

            var search = await fetch("https://localhost:44371/api/Auctioneers",options);
            var auctioneers = await search.json();
            if(auctioneers?.Status != "Error" || auctioneers != null){
                window.location.reload();
            }
            else{
                setMessage(auctioneers?.Message);
            }
        }
    }

    useEffect(()=>{
        const fetchAuctioneers = async ()=>{
            var search = await fetch("https://localhost:44371/api/Auctioneers");
            var auctioneers = await search.json();
            if(auctioneers != null || auctioneers != undefined){
                setAuctioneers(await auctioneers);
            }
        }

        const fetchAuctionItems = async ()=>{
            var search = await fetch("https://localhost:44371/api/AuctionItems/Current");
            var auctionItems = await search.json();
            if(auctionItems != null || auctionItems != undefined){
                setCurrentAuctionItem(await auctionItems);
            }
        }

        fetchAuctionItems();
        fetchAuctioneers();
    },[]);


    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"username" , header:"Käyttäjänimi", defaultFlex:2},
        {name:"email" , header:"Sähköposti",  defaultFlex:2},
        {name:"price" , header:"Hinta", type: "number", defaultFlex:1}
    ]


    return(
    <div className='homeMainDiv'>
        <div>
            <div>
                <h1>Huutokauppa!</h1>
                {currentAuctionItem?.description}
            </div>
            <div className='homeDataGridDiv'>
                <ReactDataGrid
                idProperty="id"
                style={{ minHeight: 450 }}
                columns={columns}
                dataSource={auctioneers}
                enableSelection={enableSelection}
                defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                sortable={false}
                //onSelectionChange={onSelectionChange}
                />
            </div>
            
        </div>
        <div>
            <h4>Osallistu huutokauppaan</h4>
            <div>
                <div className='homeInputDiv'>
                    <Form.Label>Sähköposti</Form.Label>
                    <Form.Control className='Input' type="email" placeholder='Sähköposti' onChange={(e)=>{setEmail(e.target.value);}} />
                    
                    <Form.Label>Hinta</Form.Label>
                    <Form.Control type="number" placeholder='Hinta' onChange={(e)=>{setPrice(e.target.value);}} />
                    
                    <Form.Label>Käyttäjänimi</Form.Label>
                    <Form.Control type="username" placeholder='Käyttäjänimi' onChange={(e)=>{setUsername(e.target.value);}} />
                    
                    <Form.Label>Salasana</Form.Label>
                    <Form.Control type="password" placeholder='Salasana' onChange={(e)=>{setPassword(e.target.value);}} />
                    <Form.Text className="text-muted">
                        Tarjouksesi tarvitsee salasanan jotta voit muokata sitä myöhemmin
                    </Form.Text>

                    <p>{message}</p>
                    <Button onClick={()=>{postAuction();}}>Tee tarjous</Button>
                </div>
            </div>
            
        </div>
    </div>)
}

export {Home}