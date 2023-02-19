import ReactDataGrid from '@inovua/reactdatagrid-community';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

import './Auction.css';
import { useLocation } from "react-router-dom";
import { handleInputChange, CountdownTimer} from  '../functions';

const Auction = ()=>{
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('auctionId');
    const [cookies, setCookie, removeCookie] = useCookies(['token', "auctioneerId","auctioneerDefaultPrice", "auctioneerDefaultIgTag", "auctioneerDefaultUsername"]);

    const [selectedRow, setSelectedRow] = useState(true);
    const [selectedRowId, setSelectedRowId] = useState(0);
    
    const [auctioneers, setAuctioneers] = useState([]);
    const [carouselImages, setCarouselImages] = useState([]);
    const [currentAuctionItem, setCurrentAuctionItem] = useState({});

    const [username, setUsername] = useState("");
    const [suggestionUsername, setSuggestionUsername] = useState("");
    const [password, setPassword] = useState("");
    const [price, setPrice] = useState(0);
    const [phonenumber, setPhonenumber] = useState(0);
    const [igTag, setIgTag] = useState("@");

    const [usernameModify, setUsernameModify] = useState("");
    const [passwordModify, setPasswordModify] = useState("");
    const [priceModify, setPriceModify] = useState(0);
    const [igTagModify, setIgTagModify] = useState("");
    
    const [message, setMessage] = useState("");

    const [auctioneerParticipateModal, setAuctioneerParticipateModal] = useState(false);
    const [auctionVisible, setAuctionVisible] = useState(0);
    
    const [datagridColumnVisiblility, setDatagridColumnVisiblility] = useState(false);
    const [datagridDefaultSelected, setDatagridDefaultSelected] = useState(cookies.auctioneerId);
    
    
    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:"Instagram tag",  defaultFlex:2},
        {name:"phonenumber" , header:"Phonenumber", defaultVisible: datagridColumnVisiblility, defaultFlex:2},
        {name:"username" , header:"Username", defaultFlex:2},
        {name:"price" , header:"Price", type: "number", defaultFlex:1}
    ]
//    headers: { "Authorization": `Bearer ${cookies.token}`}
    
    const onSelectionChange = useCallback((selected) => {
        console.log(selected);
        setUsernameModify(selected?.data.username);
        setPriceModify(selected?.data.price);
        setIgTagModify(selected?.data.igTag);
        setSelectedRowId(selected?.data.id);
        setSelectedRow(false);
    }, [])

    const resetValues = ()=>{

        setAuctioneerParticipateModal(false);
        setPassword("");
        setUsername("");
        setSuggestionUsername("");
        setPrice(0);
        setPhonenumber(0);
        setIgTag("@");

        setUsernameModify("");
        setPasswordModify("");
        setIgTagModify("");
        setPriceModify(0);

        setSelectedRowId(0);
        setMessage("");
    }

    const setCookies = (result)=>{
        setCookie('auctioneerId', result.id, { path: '/Auction' });
        setCookie('auctioneerDefaultPrice', result.price, { path: '/Auction' });
        setCookie('auctioneerDefaultIgTag', result.igTag, { path: '/Auction' });
        setCookie('auctioneerDefaultUsername', result.username, { path: '/Auction' });
        //window.location.reload(); // HUONO PITÄIS SAAHA PÄIVITTYMÄÄN PAREMMIN
        fetchAuctioneers();
        resetValues();
    }

    const postAuction = async ()=>{
        try{
            if(igTag != "" &&  price != 0){
                const options = {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify({
                        Username: username == "" ? suggestionUsername :username, 
                        IgTag: igTag,
                        Price: price,
                        Password: password,
                        Phonenumber:phonenumber == "" ? 0 : phonenumber,
                        AuctionItemId: currentAuctionItem.id
                    })
                }

                var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId,options);
                var result = await search.json();
                if(result?.status != "Error" && result != null){
                    setCookies(result);
                }
                else{
                    setMessage(result?.message);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const fetchAuctioneers = async()=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var result = null;
        if(cookies.token == undefined){
            var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId);
            result = await search.json();
        }
        else{
            var search = await fetch("https://localhost:44371/api/Auctioneers/Creator/"+auctionId, options);
            result = await search.json();
            if(result?.length > 0){
                setDatagridColumnVisiblility(true);
                result.map((e)=>{
                    if(e.phonenumber == 0){
                        e.phonenumber = "";
                    }
                })
            }
        }

        if(cookies?.auctioneerId != null && cookies?.auctioneerId != undefined && cookies?.auctioneerId != 0){
            //Tarkistetaan jos selaimessa olevat cookiet liittyvät eri auctionitemiin ne poistetaan.
            var cookieExistOutsideAuction = true;
            result.map((e)=>{
                    if(e.id == cookies.auctioneerId){
                        cookieExistOutsideAuction = false;
                    }
            });

            if(cookieExistOutsideAuction == false){
                setDatagridDefaultSelected(cookies.auctioneerId);
                setSelectedRow(false);
            }
            else{
                removeCookie('auctioneerId',{ path: '/Auction' });
                removeCookie('auctioneerDefaultPrice',{ path: '/Auction' });
                removeCookie('auctioneerDefaultIgTag',{ path: '/Auction' });
                removeCookie('auctioneerDefaultUsername',{ path: '/Auction' });
            }
        }
        
        
        if(result != null && result != undefined && result?.status != "Error"){
            setAuctioneers(await result);
        }
    }

    const modifyAuction = async ()=>{
        try{
            if(passwordModify != "" &&  priceModify != 0 || passwordModify != "" && cookies.auctioneerDefaultPrice != null){
                const options = {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify({
                        Username: usernameModify == "" ? cookies.auctioneerDefaultUsername : usernameModify, 
                        IgTag: igTagModify == "" ? cookies.auctioneerDefaultIgTag : igTagModify,
                        Price: priceModify == 0 ? cookies.auctioneerDefaultPrice : priceModify,
                        Password: passwordModify,
                    })
                }
    
                var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId,options);
                var result = await search.json();
                if(result?.status != "Error" && result != null){
                    setCookies(result);
                }
                else{
                    setMessage(result?.message);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }



    const fetchAuctionItem = async ()=>{

        var search = await fetch("https://localhost:44371/api/AuctionItems/"+auctionId);
        var auctionItem = await search.json();

        if(auctionItem?.status != "Error"){
            setCurrentAuctionItem(await auctionItem);
            setAuctionVisible(1);                
        }
        else{
            setAuctionVisible(2);                
            console.log(auctionItem?.message);
        }
    }


    const fetchImages = async ()=>{
        if(auctionId != null && auctionId != ""){
            var search = await fetch("https://localhost:44371/api/Images/public/"+auctionId);
            var images = await search.json();
    
            if(images != null && images != undefined && images?.status != "Error")
                setCarouselImages(await images);
        }
    }


    useEffect(()=>{
        fetchAuctionItem();
        fetchAuctioneers();
        fetchImages();
    },[]);

    const carouselImagesRender = carouselImages.map((e, i)=>{
        return (
            <Carousel.Item interval={12000}>

                <a className='auctionCarouselImgDiv' href={e}>
                    <img
                    className="carouselImage d-block"
                    src={e}
                    />
                </a>


                {i == 0 ? 
                <Carousel.Caption>
                    <h1 className='carouselTitle'>{currentAuctionItem?.title}</h1>
                </Carousel.Caption>
                :
                null}
            </Carousel.Item>
        )
    });
    
    return(
<div >
    { auctionVisible == 1 ?  
        <div className='auctionMainDiv'> 
            <div>
                <div className='carouselMainDiv'>
                    <Carousel  className='auctionCarousel'>
                        {carouselImagesRender}
                    </Carousel>
                </div>
                <div className='auctionDescriptionDiv square rounded'>
                    <p className='auctionDescription'>{currentAuctionItem?.description}</p>
                </div>
                <div className='auctionInputDiv'>
                    <div className='modifyInputDiv'>
                        <div>
                            <h4>Modify offer</h4>
                            <p>
                                You can modify your auction by selecting it in the menu and giving the correct password
                                The minimum raise is 5€
                            </p>
                        </div>
                        <div >

                            <div className='auctionFormInputs'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control disabled={selectedRow} type="number" placeholder='Price' value={priceModify != 0 ? priceModify : cookies.auctioneerDefaultPrice} onChange={(e)=>{setPriceModify(handleInputChange(e));}} />
                            </div>

                            <div className='auctionFormInputs'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={selectedRow} type="password" placeholder='Password' value={passwordModify} onChange={(e)=>{setPasswordModify(handleInputChange(e));}} />
                                <Form.Text className="text-muted">
                                    Use your password to modify the post.
                                </Form.Text>
                            </div>

                            <div className='auctionFormInputs'>
                                <p className='errorMessage'>{message}</p>
                                <Button disabled={selectedRow} onClick={()=>{modifyAuction();}}>
                                    Save
                                </Button>
                                
                            </div>
                        </div>
                    </div>
                    <div className='auctionParticipateDiv'>
                        <div>
                            <div>
                                <h4>Participate!</h4>
                                <p>
                                    You can participate by making an offer below. 
                                    The minimum raise is 5€
                                    The password is used to modify the offer later
                                </p>
                                <Button onClick={()=>{setAuctioneerParticipateModal(true);}}>Participate</Button>
                            </div>
                            
                            <Modal 
                                show={auctioneerParticipateModal}
                            >

                            
                                <Modal.Header className="ModalHeader">
                                    <Modal.Title>Make an offer</Modal.Title>
                                    <CloseButton variant="white" className='modalCloseButton' onClick={()=>{resetValues();}} />
                                </Modal.Header>

                                <Modal.Body className="ModalBody">
                                    <div className='auctionFormInputs'>
                                        <Form.Label>Instagram tag</Form.Label>
                                        <Form.Control 
                                            autoFocus
                                            onBlur={(e)=>{handleInputChange(e);}} 
                                            className='Input' 
                                            placeholder='@ExampleInstagramAccount' 
                                            value={igTag} 
                                            onChange={(e)=>{ 
                                                if(username == "")
                                                    setSuggestionUsername(handleInputChange(e)); 
                                                setIgTag(handleInputChange(e));}
                                                } 
                                        />
                                    </div>
                                    <div className='auctionFormInputs'>
                                        <Form.Label>Phonenumber</Form.Label>
                                        <Form.Control className='Input' placeholder='Phonenumber' onChange={(e)=>{setPhonenumber(e.target.value);}} />
                                        <Form.Text className="text-muted" id="phonenumberText">
                                            Phonenumber is optional
                                        </Form.Text>
                                    </div>

                                    <div className='auctionFormInputs'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder='Price' onChange={(e)=>{setPrice(handleInputChange(e));}} />
                                    </div>

                                    <div className='auctionFormInputs'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder='Username' value={suggestionUsername} onChange={(e)=>{setUsername(handleInputChange(e)); setSuggestionUsername(handleInputChange(e));}} />
                                    </div>

                                    <div className='auctionFormInputs'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder='Password' onChange={(e)=>{setPassword(handleInputChange(e));}} />
                                        <Form.Text className="text-muted">
                                            Your offer needs a password so you can modify it later.
                                        </Form.Text>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer id="ModalFooter">
                                    <p className='errorMessage'>{message}</p>
                                    <Button variant="secondary" onClick={()=>{resetValues();}}>
                                        Close
                                    </Button>
                                    <Button onClick={()=>{postAuction();}}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

            <div >
                <div className='auctionDataGridDiv'>
                    <div>
                        <div>
                            <h1>Auction!</h1>
                        </div>
                        <div className='auctionCountdownDiv'>
                            <CountdownTimer targetDate={currentAuctionItem?.closingTime} />
                        </div>
                        <div>
                            <ReactDataGrid
                                idProperty="id"
                                className='auctionReactDataGrid'
                                style={{height: 1000, maxHeight: 1000}}
                                columns={columns}
                                dataSource={auctioneers}
                                enableSelection={true}
                                defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                sortable={false}
                                onSelectionChange={onSelectionChange}
                                enableKeyboardNavigation={false}
                                toggleRowSelectOnClick={true}
                                defaultSelected={ datagridDefaultSelected}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                            />
                        </div>
                    </div>
                <div >
                </div>
            </div>
        </div>
    </div>
      : auctionVisible == 0 ?
        <div className='AuctionItemSpinnerDiv'>
            <Spinner  animation="border" variant="light"/>
        </div> 
    :
        <div>
            <h1>Error</h1>
            <p>The auctionitem you were looking for dosent exist or has been unlisted by the creator</p>
        </div>
    }
</div>
    )
}

export {Auction}