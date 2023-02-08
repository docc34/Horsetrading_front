import ReactDataGrid from '@inovua/reactdatagrid-community';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import { useState, useEffect, useCallback } from 'react';

import './Auction.css';
import { useLocation } from "react-router-dom";
import { handleInputChange, CountdownTimer} from  '../functions';

const Auction = ()=>{
    
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('auctionId');

    const [selectedRow, setSelectedRow] = useState(true);
    const [auctioneers, setAuctioneers] = useState([]);
    const [carouselImages, setCarouselImages] = useState([]);
    const [currentAuctionItem, setCurrentAuctionItem] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [price, setPrice] = useState(0);
    const [phonenumber, setPhonenumber] = useState(0);
    const [igTag, setIgTag] = useState("");

    const [usernameModify, setUsernameModify] = useState("");
    const [passwordModify, setPasswordModify] = useState("");
    const [priceModify, setPriceModify] = useState(0);
    const [phonenumberModify, setPhonenumberModify] = useState(0);
    const [igTagModify, setIgTagModify] = useState("");
    
    const [auctioneer, setAuctioneer] = useState("");
    const [modifyAuctioneer, setModifyAuctioneer] = useState("");

    const [message, setMessage] = useState("");

    
    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:"Instagram tag",  defaultFlex:2},
        {name:"phonenumber" , header:"Phonenumber", defaultFlex:2},
        {name:"username" , header:"Username", defaultFlex:2},
        {name:"price" , header:"Price", type: "number", defaultFlex:1}
    ]
//    headers: { "Authorization": `Bearer ${cookies.token}`}

    const postAuction = async ()=>{
        try{
            if(auctioneer?.igTag != "" &&  auctioneer?.price != 0){
                const options = {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(auctioneer)
                }
                console.log(auctioneer);

                var search = await fetch("https://localhost:44371/api/Auctioneers",options);
                var auctioneers = await search.json();
                if(auctioneers?.status == "Ok"){
                    window.location.reload();
                    setMessage(auctioneers?.message);
                }
                else{
                    setMessage(auctioneers?.message);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const modifyAuction = async ()=>{
        try{
            if(modifyAuctioneer.igTag != "" &&  modifyAuctioneer.price != 0){
                const options = {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(modifyAuctioneer)
                }
    
                var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId,options);
                var auctioneers = await search.json();
                if(auctioneers?.status == "Ok"){
                    window.location.reload();
                    setMessage(auctioneers?.message);
                }
                else{
                    setMessage(auctioneers?.message);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(modifyAuctioneer != ""){
            modifyAuction();
        }
    },[modifyAuctioneer]);

    useEffect(()=>{
        if(auctioneer != ""){
           postAuction();
        }
    },[auctioneer]);
    

    const fetchData = async ()=>{
        var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId);
        var auctioneers = await search.json();

        search = await fetch("https://localhost:44371/api/Images/"+auctionId);
        var images = await search.json();

        if(images != null || images != undefined)
            setCarouselImages(await images);

        if(auctioneers != null || auctioneers != undefined){
            
            auctioneers.map((e)=>{
                if(e.phonenumber == 0){
                    e.phonenumber = "";
                }
            })
            setAuctioneers(await auctioneers);
        }
    }

    const fetchAuctionItem = async ()=>{
        var search = await fetch("https://localhost:44371/api/AuctionItems/"+auctionId);
        var auctionItem = await search.json();
        if(auctionItem != null || auctionItem != undefined){
            setCurrentAuctionItem(await auctionItem);
        }
    }

    useEffect(()=>{
        fetchAuctionItem();
        fetchData();
    },[]);

    

    const onSelectionChange = useCallback((e) => {
        console.log(e);
        setUsernameModify(e.data.username);
        setPriceModify(e.data.price);
        setPhonenumberModify(e.data.phonenumber);
        setIgTagModify(e.data.igTag);

        setSelectedRow(false);
    }, [])

    const carouselImagesRender = carouselImages.map((e, i)=>{

        if(i == 0){
            return (
                <Carousel.Item interval={12000}>
                    
                    <a href={e.imageLink}>
                        <img
                        className="carouselImage"
                        src={e.imageLink}
                        />
                    </a>

                    <Carousel.Caption>
                        <h1>{currentAuctionItem?.title}</h1>
                        <p>{currentAuctionItem?.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
        else{
            return (
                <Carousel.Item interval={6000}>
                    <a href={e.imageLink}>
                        <img
                        className="carouselImage"
                        src={e.imageLink}
                        />
                    </a>
                </Carousel.Item>
            )
        }
        
    });
    
    return(
    <div className='homeMainDiv'>
        <div className='homeCarouselDiv'>
            <Carousel>
                {carouselImagesRender}
            </Carousel>
        </div>
        <div className='homeInputsMainDiv'>
            <div className='homeFormsDiv'>
                <div>
                    
                    <div>
                        <h1>Auction!</h1>
                        {/* {currentAuctionItem?.description} */}
                    </div>
                    <div>
                        <CountdownTimer targetDate={currentAuctionItem?.closingTime} />
                    </div>
                    <div className='homeDataGridDiv'>
                        <ReactDataGrid
                        idProperty="id"
                        style={{ minHeight: 450, minWidth: 500 }}
                        columns={columns}
                        dataSource={auctioneers}
                        enableSelection={true}
                        defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                        sortable={false}
                        onSelectionChange={onSelectionChange}
                        
                        />
                    </div>
                </div>
                
                <div className='modifyInputDiv'>
                    <div>
                        <h4>Modify offer</h4>
                        <p>
                            You can modify your auction by selecting it in the menu and giving the correct password
                            The minimum raise is 5€
                        </p>
                    </div>
                    <div className='homeInputDiv'>
                        {/* <div className='homeFormInputs'>
                            <Form.Label>Instagram tag</Form.Label>
                            <Form.Control disabled={selectedRow} onBlur={(e)=>{handleInputChange(e);}} value={igTagModify} className='Input' placeholder='@ExampleInstagramAccount' onChange={(e)=>{setIgTagModify(handleInputChange(e));}} />
                        </div>

                        <div className='homeFormInputs'>
                            <Form.Label>Phonenumber</Form.Label>
                            <Form.Control disabled={selectedRow} className='Input' placeholder='Phonenumber' value={phonenumberModify} onChange={(e)=>{setPhonenumberModify(e.target.value);}} />
                            <Form.Text className="text-muted" id="phonenumberText">
                                Phonenumber is optional
                            </Form.Text>
                        </div> */}

                        <div className='homeFormInputs'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control disabled={selectedRow} type="number" placeholder='Price' value={priceModify} onChange={(e)=>{setPriceModify(handleInputChange(e));}} />
                        </div>
                        {/* 
                        <div className='homeFormInputs'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control disabled={selectedRow} type="username" placeholder='Username' value={usernameModify} onChange={(e)=>{setUsernameModify(handleInputChange(e));}} />
                        </div> */}

                        <div className='homeFormInputs'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control disabled={selectedRow} type="password" placeholder='Password' onChange={(e)=>{setPasswordModify(handleInputChange(e));}} />
                            <Form.Text className="text-muted">
                                Use your password to modify the post.
                            </Form.Text>
                        </div>

                        <div className='homeFormInputs'>
                            <p className='errorMessage'>{message}</p>
                            <Button disabled={selectedRow} onClick={()=>{
                                setModifyAuctioneer({
                                    Username: usernameModify, 
                                    IgTag: igTagModify,
                                    Price: priceModify,
                                    Password: passwordModify,
                                    Phonenumber:phonenumberModify  == "" ? 0 : phonenumberModify,
                                    AuctionItemId: currentAuctionItem.id
                                });
                            }}>
                                Save
                            </Button>
                            
                        </div>
                        <a href="/">Home</a>
                    </div>
                </div>
            </div>
            <div >
                <div>
                    <div>
                        <h4>Participate!</h4>
                        <p>
                            You can participate by making an offer below. 
                            The minimum raise is 5€
                            The password is used to modify the offer later
                        </p>
                    </div>
                    <div className='homeInputDiv'>
                        <div className='homeFormInputs'>
                            <Form.Label>Instagram tag</Form.Label>
                            <Form.Control onBlur={(e)=>{handleInputChange(e);}} className='Input' placeholder='@ExampleInstagramAccount' onChange={(e)=>{setIgTag(handleInputChange(e));}} />
                        </div>
                        <div className='homeFormInputs'>
                            <Form.Label>Phonenumber</Form.Label>
                            <Form.Control className='Input' placeholder='Phonenumber' onChange={(e)=>{setPhonenumber(e.target.value);}} />
                            <Form.Text className="text-muted" id="phonenumberText">
                                Phonenumber is optional
                            </Form.Text>
                        </div>

                        <div className='homeFormInputs'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder='Price' onChange={(e)=>{setPrice(handleInputChange(e));}} />
                        </div>

                        <div className='homeFormInputs'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder='Username' onChange={(e)=>{setUsername(handleInputChange(e));}} />
                        </div>

                        <div className='homeFormInputs'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Password' onChange={(e)=>{setPassword(handleInputChange(e));}} />
                            <Form.Text className="text-muted">
                                Your offer needs a password so you can modify it later.
                            </Form.Text>
                        </div>
                        <div className='homeFormInputs'>
                            <p className='errorMessage'>{message}</p>
                            <Button onClick={()=>{setAuctioneer({
                                Username: username, 
                                IgTag: igTag,
                                Price: price,
                                Password: password,
                                Phonenumber:phonenumber == "" ? 0 : phonenumber,
                                AuctionItemId: currentAuctionItem.id
                            });}}>Save</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>)
}

export {Auction}