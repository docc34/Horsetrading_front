import ReactDataGrid from '@inovua/reactdatagrid-community';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

import './Auction.css';
import { useLocation } from "react-router-dom";
import { handleInputChange, CountdownTimer, useInterval} from  '../functions';
import { propTypes } from 'react-bootstrap/esm/Image';
import '@inovua/reactdatagrid-community/index.css'

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
    
    const [currentAuctioneer, setCurrentAuctioneer] = useState([]);

    const [highestOffer, setHighestOffer] = useState([]);

    //Dont Delete
    const [phonenumberCollapse, setPhonenumberCollapse] = useState(false);
    const [participateValidated, setParticipateValidated] = useState(false);
    const [modifyValidated, setModifyValidated] = useState(false);
    
    const auctioneerColumns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:"Instagram tag",  defaultFlex:2},
        {name:"phonenumber" , header:"Phonenumber", defaultVisible: datagridColumnVisiblility, defaultFlex:2},
        {name:"username" , header:"Username", defaultFlex:2},
        {name:"price" , header:"Price", type: "number", defaultFlex:1}
    ]

    const currentAuctioneerColumns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:"Instagram tag",  defaultFlex:2},
        {name:"phonenumber" , header:"Phonenumber",  defaultVisible: false, defaultFlex:2},
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

        setModifyValidated(false);
        setParticipateValidated(false);
    }

    const setCookies = (result)=>{
        if(result?.status > 210){
            setMessage("Error");
        }
        else{
            console.log(result);
            setCookie('auctioneerId', result.id, { path: '/Auction' });
            setCookie('auctioneerDefaultPrice', result.price, { path: '/Auction' });
            setCookie('auctioneerDefaultIgTag', result.igTag, { path: '/Auction' });
            setCookie('auctioneerDefaultUsername', result.username, { path: '/Auction' });
            //window.location.reload(); // HUONO PITÄIS SAAHA PÄIVITTYMÄÄN PAREMMIN
            fetchAuctioneers();
            fetchCurrentAuctioneer(result.id);
            resetValues();
        }
        
    }

    useInterval(()=>{
        fetchAuctioneers(0);//TODO:Ota käyttöön haku kun saat toimimaan
    },60000);
    //https://react-bootstrap.github.io/forms/validation/
    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }
    //     else{
    //         setValidated(true);
    //         postAuction();
    //     }
    
    //   };
    const handleParticipateSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setParticipateValidated(true);
        }
        // if(price - highestOffer < 5){
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        else{
            event.preventDefault();
            postAuctioneer();
            setParticipateValidated(false);
        }

    };

    const handleModifySubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setModifyValidated(true);
        }
        // if(price - highestOffer < 5){
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        else{
            event.preventDefault();
            modifyAuction();
            setModifyValidated(false);
        }

    };

    const postAuctioneer = async ()=>{
        try{
            if(igTag != "@" && igTag != "" &&  price != 0 &&  price != ""&&  password != ""){
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

    const fetchAuctioneers = async(amountToFetch, firstFetch)=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var result = null;
        var amount = amountToFetch != undefined ? amountToFetch : 0;
        if(cookies.token == undefined){
            var search = await fetch("https://localhost:44371/api/Auctioneers/"+auctionId+"?Amount="+ amount);
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
            if(firstFetch == true){
                fetchCurrentAuctioneer();
            }
            //TODO: Korjaa
            //Tarkistetaan jos selaimessa olevat cookiet liittyvät eri auctionitemiin ne poistetaan.
            // var cookieExistOutsideAuction = true;
            // result.map((e)=>{
            //         if(e.id == cookies.auctioneerId){
            //             cookieExistOutsideAuction = false;
            //         }
            // });

            // if(cookieExistOutsideAuction == false){
            //     if(firstFetch == true){
            //         setDatagridDefaultSelected(cookies.auctioneerId);
            //         setSelectedRow(false);
            //         fetchCurrentAuctioneer();
            //     }
            // }
            // else{
            //     removeCookie('auctioneerId',{ path: '/Auction' });
            //     removeCookie('auctioneerDefaultPrice',{ path: '/Auction' });
            //     removeCookie('auctioneerDefaultIgTag',{ path: '/Auction' });
            //     removeCookie('auctioneerDefaultUsername',{ path: '/Auction' });
            // }
        }
        
        
        if(result != null && result != undefined && result?.status != "Error"){
            setAuctioneers(await result);
            setHighestOffer(result[0].highestOffer);
        }
    }

    const fetchCurrentAuctioneer = async (auctioneerId)=>{
        if(cookies?.auctioneerId != null && cookies?.auctioneerId != undefined && cookies?.auctioneerId != 0 || auctioneerId != undefined && auctionId != 0){

            var id = auctioneerId != undefined ? auctioneerId : cookies.auctioneerId;
            var search = await fetch("https://localhost:44371/api/Auctioneers/Current/?auctionItemId="+auctionId+"&auctioneerId="+id);
            var result = await search.json();
            if(result?.status != "Error" && result != null){
                setCurrentAuctioneer([result]);
                setDatagridDefaultSelected(id);
                setSelectedRow(false);
            }
            else{
                setMessage(result?.message);
            }
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



    const fetchAuctionItem = async (i)=>{
        if(i == 1){
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
        fetchAuctionItem(1);
        fetchAuctioneers(0, true);//TODO:Ota käyttöön haku kun saat toimimaan
        fetchImages();
    },[]);

    const carouselImagesRender = carouselImages.map((e, i)=>{
        return (
            // interval={12000}
            <Carousel.Item interval={null}>

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

            <div className='auctionCarouselMainDiv'>
                <div className='carouselDiv'>
                    <Carousel  className='auctionCarousel'>
                        {carouselImagesRender}
                    </Carousel>
                </div>
                <div className='auctionDescriptionDiv square rounded'>
                    <hr />
                    <p className='auctionDescription'>{currentAuctionItem?.description}</p>
                </div>
                
            </div>

            <div className='auctionContentMainDiv'>
                <div className='auctionDataGridDiv'>
                    <div>
                        <div className='auctionTitleDiv'>
                            <h1 className='auctionTitle'>Auction!</h1>
                        </div>
                        <div className='auctionCountdownDiv'>
                            <CountdownTimer targetDate={currentAuctionItem?.closingTime} />
                        </div>
                        <div>
                        <Tabs
                            defaultActiveKey="Top5"
                            id="fill-tab"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="Top5" title="Top 5 highest offers" onClick={()=>{fetchAuctioneers(5);}}>
                                
                                <h3>Top 5 highest offers</h3>
                                <ReactDataGrid
                                    idProperty="id"
                                    className='auctionReactDataGrid'
                                    style={cookies?.token?.length > 6 ? {height: 1000} : {minHeight: 243}}
                                    columns={auctioneerColumns}
                                    dataSource={auctioneers?.slice(0, 5)}
                                    enableSelection={true}
                                    defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                    sortable={false}
                                    onSelectionChange={onSelectionChange}
                                    enableKeyboardNavigation={false}
                                    toggleRowSelectOnClick={true}
                                    defaultSelected={ datagridDefaultSelected}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                    selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                    rowClassName="auctionReactDataGridRows"
                                    showColumnMenuTool={false}
                                />
                            </Tab>
                            <Tab eventKey="allOffers" title="All offers" onClick={()=>{fetchAuctioneers(0)}} href="#">
                                <h3>All offers</h3>
                                <ReactDataGrid
                                    idProperty="id"
                                    className='auctionReactDataGrid'
                                    style={cookies?.token?.length > 6 ? {height: 1000} : {minHeight: 46 * auctioneers?.length}}
                                    columns={auctioneerColumns}
                                    dataSource={auctioneers}
                                    enableSelection={true}
                                    defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                    sortable={false}
                                    onSelectionChange={onSelectionChange}
                                    enableKeyboardNavigation={false}
                                    toggleRowSelectOnClick={true}
                                    defaultSelected={ datagridDefaultSelected}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                    selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                    rowClassName="auctionReactDataGridRows"
                                    showColumnMenuTool={false}
                                />
                            </Tab>
                        </Tabs>

                        </div>
                        <div className='auctionReactDataGridSingle'>
                            {cookies.auctioneerId != null && currentAuctioneer != [] && currentAuctioneer?.length != 0 ? 
                                <div>
                                    <h3>Your offer</h3>
                                {/* //currentAuctioneerColumns */}
                                    <ReactDataGrid
                                        idProperty="id"
                                        style={{minHeight: 42}}
                                        columns={currentAuctioneerColumns}
                                        dataSource={currentAuctioneer}
                                        enableSelection={true}
                                        //defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                        sortable={false}
                                        //onSelectionChange={onSelectionChange}
                                        enableKeyboardNavigation={false}
                                        toggleRowSelectOnClick={false}
                                        defaultSelected={ datagridDefaultSelected}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                        selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                        showHeader={false}
                                    />
                                </div>
                                :
                                null
                            } 
                        </div>
                        
                    <div className='auctionInputDiv'>
                        <div className='auctionParticipateDiv'>
                                <div>
                                    <div>
                                        <h4>Participate!</h4>
                                        <p>
                                            You can participate by creating an offer below.
                                        </p>
                                        <Button onClick={()=>{setAuctioneerParticipateModal(true);}}>Participate</Button>
                                    </div>
                                    
                                    <Modal 
                                        show={auctioneerParticipateModal}
                                    >
                                    <Form noValidate validated={participateValidated} onSubmit={handleParticipateSubmit} >
                                    {/* <form noValidate validated={validated} onSubmit={handleSubmit}> */}
                                        <Modal.Header className="ModalHeader">
                                            <Modal.Title>Make an offer</Modal.Title>
                                            <CloseButton variant="white" className='modalCloseButton' onClick={()=>{resetValues();}} />
                                        </Modal.Header>

                                        <Modal.Body className="ModalBody">
                                            <div>
                                                <h3>The current highest offer is {highestOffer}€</h3>
                                                <p>Your offer must be atleast 5€ higher than the current highest offer.</p>
                                            </div>
                                            <div className='auctionFormInputs'>
                                                <Form.Label>Instagram tag</Form.Label>
                                                <Form.Control 
                                                    required
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
                                            
                                            {/* <a className='phonenumberCollapseTitle' onClick={()=>{setPhonenumberCollapse(!phonenumberCollapse)}} href="#">
                                                You can also sing up with your phonenumber!
                                            </a>

                                            <div className='auctionFormInputs'>

                                                <Collapse in={phonenumberCollapse}>
                                                    <div className='auctionFormInputs'>
                                                        <Form.Label>Phonenumber</Form.Label>
                                                        <Form.Control className='Input' placeholder='Phonenumber' onChange={(e)=>{setPhonenumber(e.target.value);}} />
                                                        <Form.Text className="text-muted" id="phonenumberText">
                                                            Phonenumber is optional
                                                        </Form.Text>
                                                    </div>
                                                </Collapse>
                                            </div> */}


                                            <div className='auctionFormInputs'>
                                                <Form.Label>Offer</Form.Label>
                                                <Form.Control required type="number" placeholder='Offer' onChange={(e)=>{setPrice(handleInputChange(e));}} />
                                                {/* <Form.Text >
                                                The current highest offer is {highestOffer}€
                                                </Form.Text> */}
                                            </div>

                                            <div className='auctionFormInputs'>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control required type="username" placeholder='Username' value={suggestionUsername} onChange={(e)=>{setUsername(handleInputChange(e)); setSuggestionUsername(handleInputChange(e));}} />
                                            </div>

                                            <div className='auctionFormInputs'>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control required type="password" placeholder='Password' onChange={(e)=>{setPassword(handleInputChange(e));}} />
                                                <Form.Text className="text-muted">
                                                    With this password you can raise your offer later on.
                                                </Form.Text>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer id="ModalFooter">
                                            <p className='errorMessage'>{message}</p>
                                            <Button variant="secondary" onClick={()=>{resetValues();}}>
                                                Close
                                            </Button>
                                            <Button type='submit'>Save</Button>
                                            {/* type='submit' */}
                                        </Modal.Footer>
                                    </Form>
                                    {/* </form> */}
                                    </Modal>
                                </div>
                        </div>
                        
                        <div className='auctionModifyInputDiv'>
                            <div>
                                <h4>Modify offer</h4>
                                <p>
                                    Here you can raise your offer by selecting yourself in the menu and giving the password you created
                                </p>
                            </div>
                            <div >
                                <Form noValidate validated={modifyValidated} onSubmit={handleModifySubmit} >
                                    <div className='auctionFormInputs'>
                                        <Form.Label>Offer</Form.Label>
                                        <Form.Control required disabled={selectedRow} type="number" placeholder='Offer' value={priceModify != 0 ? priceModify : cookies.auctioneerDefaultPrice} onChange={(e)=>{setPriceModify(e.target.value);}} />
                                        <Form.Control.Feedback type="invalid">
                                            Please type in an offer.
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className='auctionFormInputs'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required disabled={selectedRow} type="password" placeholder='Password' value={passwordModify} onChange={(e)=>{setPasswordModify(e.target.value);}} />
                                        <Form.Control.Feedback type="invalid">
                                            Please type in an password.
                                        </Form.Control.Feedback>

                                        <Form.Text className="text-muted">
                                            Use your password to modify the post.
                                        </Form.Text>
                                    </div>

                                    <div className='auctionFormInputs'>
                                        <p className='errorMessage'>{message}</p>
                                        <Button disabled={selectedRow} type="submit" > {/*onClick={()=>{modifyAuction();}}*/}
                                            Save
                                        </Button>
                                        
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>    
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