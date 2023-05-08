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

import { useState, useEffect, useCallback,useReducer } from 'react';
import { useCookies } from 'react-cookie';

import './Auction.css';
import { useLocation } from "react-router-dom";
import { CountdownTimer} from '../components/CountdownTimer'
import {receiveMessage, sendSignalMessage} from '../SignalRConnection';
import { propTypes } from 'react-bootstrap/esm/Image';
import '@inovua/reactdatagrid-community/index.css'
import { useTranslation } from 'react-i18next';

const Auction = ()=>{
    const search = useLocation().search;
    const auctionId = new URLSearchParams(search).get('auctionId');
    const [cookies, setCookie, removeCookie] = useCookies(['token', "auctioneerId","auctioneerDefaultPrice", "auctioneerDefaultIgTag", "auctioneerDefaultUsername","recentAuctionItems"]);
    const {t} = useTranslation();

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
    const [auctionClosingTime, setAuctionClosingTime] = useState("");

    const [usernameModify, setUsernameModify] = useState("");
    const [passwordModify, setPasswordModify] = useState("");
    const [priceModify, setPriceModify] = useState(0);
    const [igTagModify, setIgTagModify] = useState("");
    const [phonenumberModify, setPhonenumberModify] = useState(0);
    
    const [message, setMessage] = useState("");

    const [auctionVisible, setAuctionVisible] = useState(0);
    
    const [datagridDefaultSelected, setDatagridDefaultSelected] = useState(cookies.auctioneerId);
    
    const [currentAuctioneer, setCurrentAuctioneer] = useState([]);

    const [highestOffer, setHighestOffer] = useState([]);

    const [phonenumberCollapse, setPhonenumberCollapse] = useState(false);
    const [igTagCollapse, setIgTagCollapse] = useState(true);
    const [participateValidated, setParticipateValidated] = useState(false);
    const [modifyValidated, setModifyValidated] = useState(false);
    
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    
    //These control the state of the user and what the application shows dependand on that
    const [isCreator, setIsCreator] = useState(false);
    const [userOfferExists, setUserOfferExists] = useState(false);
    const [newUser, setNewUser] = useState(true);

    //Test to fix react update
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    
    //Defines witch columns are visible dependad on if the user is logged in or not
    var auctioneerColumns = []
    { isCreator == false ?        
    auctioneerColumns =[{name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:t("igTag"),  defaultVisible: false,  defaultFlex:2},
        {name:"phonenumber" , header:t("phonenumber"), defaultVisible: false, defaultFlex:2},
        {name:"username" , header:t("username"), defaultFlex:2},
        {name:"price" , header:t("offer"), type: "number", defaultFlex:1}]
        :
    auctioneerColumns =[{name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:t("igTag"),    defaultFlex:2},
        {name:"phonenumber" , header:t("phonenumber"), defaultFlex:2},
        {name:"username" , header:t("username"), defaultFlex:2},
        {name:"price" , header:t("offer"), type: "number", defaultFlex:1}]
    }

    const currentAuctioneerColumns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"igTag" , header:t("igTag"),  defaultFlex:2},
        {name:"phonenumber" , header:t("phonenumber"),  defaultFlex:2},
        {name:"username" , header:t("username"), defaultFlex:2},
        {name:"price" , header:t("offer"), type: "number", defaultFlex:1}
    ]

    //Kun joku tekee tarjouksen ja hinta päivittyy tämä funktio ottaa sen vastaan
    const receiveSignalMessage = (auctionItemId, auctioneers,AuctionClosingTime)=>{
        if(auctionItemId == auctionId){
            setAuctioneers(auctioneers);
            //päivitetään highest offer
            var addedAuctioneer = auctioneers[0];
            setHighestOffer(addedAuctioneer?.price);
            setAuctionClosingTime(AuctionClosingTime);
            forceUpdate();
        }
    }
    
    //Asettaa home sivulla seurattavien viimeksi vierailtujen auctionitemien id:n 
    const setRecentAuctionItems = ()=>{
        var list = cookies?.recentAuctionItems;
        if(list != null && list != undefined && list != ""){
            //Checks that the auctionitemid dosent already exist in the taböe
            var i = true
            list?.map((e)=>{
                if(e == auctionId && e != null){
                    i = false;
                }
            });
            if(i == true){
                list[list?.length] = auctionId;
                setCookie('recentAuctionItems', list, { path: '/' });
            }
        }
        else{
            setCookie('recentAuctionItems', [auctionId], { path: '/' });
        }
    }

    //Salasanan näyttämisnapin funktio
    const togglePasswordVisibility = () => {
        if (passwordVisibility === "password") {
        setPasswordVisibility("text");
        return;
        }
        setPasswordVisibility("password");
    };

    //Kun datagridin riviä klikataan
    const onSelectionChange = useCallback((selected) => {
        setUsernameModify(selected?.data.username);
        setPriceModify(selected?.data.price);
        setIgTagModify(selected?.data?.igTag);
        setPhonenumberModify(selected?.data?.phonenumber);
        setSelectedRowId(selected?.data.id);
        setSelectedRow(false);
    }, [])

    const resetValues = ()=>{
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

        setPasswordVisibility("password");
    }

    const setCookies = (result)=>{
        if(result.status == "Ok" && result != undefined){
            //Otetaan apin antamat arvot talteen
            var resultList = result.object.value;
            var addedAuctioneer = resultList[0];
             
            //Tallennetaan kekseihin käyttäjän oman tarjouksen arvot.
            setCookie('auctioneerId', addedAuctioneer.id, { path: '/Auction' });
            setCookie('auctioneerDefaultPrice', addedAuctioneer.price, { path: '/Auction' });
            setCookie('auctioneerDefaultIgTag', addedAuctioneer.igTag, { path: '/Auction' });
            setCookie('auctioneerDefaultPhonenumber', addedAuctioneer.phonenumber, { path: '/Auction' });
            setCookie('auctioneerDefaultUsername', addedAuctioneer.username, { path: '/Auction' });

            //Lähetetään lisäyksen hakemat uusimmat auctioneerit muille signalrrin pipen kautta.
            sendSignalMessage(auctionId,resultList,addedAuctioneer.auctionItemClosingTime);

            //Päivitetään data
            setAuctioneers(resultList);
            //päivitetään highest offer
            setHighestOffer(addedAuctioneer.price);
            //Haetaan nykyisen käyttäjän tiedot uudestaan.
            fetchCurrentAuctioneer(addedAuctioneer.id, result?.message);
            resetValues();
        }
        else{
            setMessage("Error");
        }
        
    }

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
            event.target.reset(); 
            modifyAuction();
            setModifyValidated(false);
        }

    };

    const postAuctioneer = async ()=>{
        try{
            if(igTag != "@" || phonenumber != ""&&  price != 0 &&  price != ""&&  password != ""){
                var body = null;
                if(igTagCollapse == true){
                    body = {
                        Username: username == "" ? suggestionUsername :username, 
                        IgTag: igTag,
                        Price: price,
                        Password: password,
                        AuctionItemId: currentAuctionItem.id
                    }
                }
                else if(igTagCollapse == false){
                    body = {
                        Username: username == "" ? suggestionUsername :username, 
                        Phonenumber: phonenumber.replace(/ /g, ""),
                        Price: price,
                        Password: password,
                        AuctionItemId: currentAuctionItem.id
                    }
                }
                const options = {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(body)
                }

                var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/"+auctionId,options);
                var result = await search.json();
                if(await result?.status == "Ok" ){
                    setCookie('auctioneerPassword', await result.message, { path: '/Auction' });
                    setCookies(await result);
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
        //Tässä pitää olla token tarkistus jossa isCreatortin voi tarkistaa
        if(cookies.token == undefined){
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/"+auctionId+"?Amount="+ amount);
            result = await search.json();
        }
        else{
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/Creator/"+auctionId+"?Amount="+ amount, options);
            result = await search.json();
            if(result?.status == "Ok" && result?.message == "Creator not found"){
                setIsCreator(false);
                setMessage(result.message);
                search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/"+auctionId+"?Amount="+ amount);
                result = await search.json();
            }
            else if(result?.length > 0){
                setIsCreator(true);
                result.map((e)=>{
                    if(e.phonenumber == 0){
                        e.phonenumber = "";
                    }
                })
            }
        }

        if(cookies?.auctioneerId != null && cookies?.auctioneerId != undefined && cookies?.auctioneerId != 0){
            //Estää turhien tuplahakujen tapahtumisen
            if(firstFetch == true){
                fetchCurrentAuctioneer();
            }
        }
        
        if(result !== null && result !== undefined && result?.status !== "Error"){
            try{
                var i = await result;
                //Ei päivitetä listaa jos se ei ole muuttunut
                if(JSON.stringify(i) !== JSON.stringify(auctioneers)){
                    setAuctioneers(i);
                    setHighestOffer(result[0].highestOffer);
                }
            }
            catch(e){
                console.log(e);
            }
        }
    }

    const fetchCurrentAuctioneer = async (auctioneerId, password)=>{
        if(cookies?.auctioneerId != null && cookies?.auctioneerId != undefined && cookies?.auctioneerId != 0 || auctioneerId != undefined && auctionId != 0){

            var id = auctioneerId != undefined ? auctioneerId : cookies.auctioneerId;
            var password = password != undefined ? password : cookies.auctioneerPassword;

            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/Current/?auctionItemId="+auctionId+"&auctioneerId="+id+"&password="+password);
            var result = await search.json();
            
            if(result?.status != "Error" && result != null){
                if( JSON.stringify(currentAuctioneer) !== JSON.stringify([result])){
                    setCurrentAuctioneer([result]);
                    setDatagridDefaultSelected(id);
                    setSelectedRow(false);
                    setUserOfferExists(true);
                    setNewUser(false);
                }
            }
            else{
                console.log(result?.message);
            }
        }
    }

    const modifyAuction = async ()=>{
        try{
            if(passwordModify != "" &&  priceModify != 0 || passwordModify != "" && cookies.auctioneerDefaultPrice != null){
                var body = null;
                if(igTagCollapse == true){
                    body = {
                        Username: usernameModify == "" ? cookies.auctioneerDefaultUsername : usernameModify, 
                        IgTag: igTagModify == 0 ? cookies.auctioneerDefaultIgTag : igTagModify,
                        Price: priceModify == 0 ? cookies.auctioneerDefaultPrice : priceModify,
                        Password: passwordModify,
                    }
                }
                else if(igTagCollapse == false){
                    body = {
                        Username: usernameModify == "" ? cookies.auctioneerDefaultUsername : usernameModify, 
                        Phonenumber: phonenumberModify == 0 ? cookies.auctioneerDefaultPhonenumber : phonenumberModify,
                        Price: priceModify == 0 ? cookies.auctioneerDefaultPrice : priceModify,
                        Password: passwordModify,
                    }
                }
                var options =  {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(body)
                }

    
                var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/"+auctionId,options);
                var result = await search.json();
                if(await result?.status == "Ok"){
                    setCookie('auctioneerPassword', await result.message, { path: '/Auction' });
                    setCookies(await result);
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

    const deleteSelectedAuctioneer = async()=>{
        try{
            if(isCreator == true && selectedRow == false){
                const options = {
                    method:'DELETE',
                    headers: { "Authorization": `Bearer ${cookies.token}`}  
                }

                var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Auctioneers/"+selectedRowId+"?auctionItemId="+auctionId,options);
                var result = await search.json();
                if(result?.status != "Error" && result != null){
                    setMessage(result?.message);
                    fetchAuctioneers();
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
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/"+auctionId);
            var auctionItem = await search.json();
    
            if(auctionItem?.status != "Error"){
                setCurrentAuctionItem(await auctionItem);
                setAuctionClosingTime(auctionItem?.closingTime);
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
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Images/public/"+auctionId);
            var images = await search.json();
    
            if(images != null && images != undefined && images?.status != "Error" && images?.status != 404 && images?.status != 401 && images?.status != 500)
                setCarouselImages(await images);
        }
    }

    useEffect(()=>{
        fetchAuctionItem(1);
        fetchAuctioneers(0, true);//TODO:Ota käyttöön haku kun saat toimimaan
        fetchImages();
        //Laitetaan funktioihin eteenpäin paikallinen vastaanotto funktio
        receiveMessage(receiveSignalMessage);
        setRecentAuctionItems();
    },[]);

    const carouselImagesRender = carouselImages.map((e, i)=>{
        return (
            // interval={12000}
            <Carousel.Item >

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
                    <Carousel interval={null} className='auctionCarousel'>
                        {carouselImagesRender}
                    </Carousel>
                </div>
                <div className='auctionDescriptionDiv square rounded'>
                    <hr />
                    <p className='auctionDescription'>{currentAuctionItem?.description}</p>
                </div>
            </div>

            <div className='auctionContentMainDiv'>
                <div className='auctionReactDataGridDiv'>
                    <div className='auctionTitleDiv'>
                        <h1 className='auctionTitle'>{t("auctionAuction")}</h1>
                    </div>
                    <div className='auctionCountdownDiv'>
                        <CountdownTimer targetDate={auctionClosingTime} />
                    </div>
                    <div className='auctionReactDataGridTabsDiv'>
                        <Tabs
                            defaultActiveKey="Top5"
                            id="fill-tab"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="Top5" title={t("auctionTop5")} onClick={()=>{fetchAuctioneers(5);}}>
                                <div className='auctionDataGridTitleDiv'>
                                    <h3>{t("auctionTop5")}</h3>
                                </div>
                                {ignored}
                                <ReactDataGrid
                                    idProperty="id"
                                    className='auctionReactDataGrid'
                                    style={{minHeight: 243}}
                                    columns={auctioneerColumns}
                                    dataSource={auctioneers?.slice(0, 5)}
                                    enableSelection={userOfferExists == true ? false : true}
                                    defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                    sortable={false}
                                    onSelectionChange={onSelectionChange}
                                    enableKeyboardNavigation={false}
                                    toggleRowSelectOnClick={cookies?.auctioneerDefaultUsername?.length > 3 ? false : true}
                                    defaultSelected={datagridDefaultSelected != undefined && datagridDefaultSelected != 0 ? datagridDefaultSelected : null}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                    selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                    rowClassName="auctionReactDataGridRows"
                                    showColumnMenuTool={false}
                                />
                            </Tab>
                            <Tab eventKey="allOffers" title={t("auctionAllOffers")} onClick={()=>{fetchAuctioneers(0)}} href="#">
                                <div className='auctionDataGridTitleDiv'>
                                    <h3>{t("auctionAllOffers")}</h3>
                                </div>
                                <ReactDataGrid
                                    idProperty="id"
                                    className='auctionReactDataGrid'
                                    style={{minHeight: 43+ 40 * auctioneers?.length}}
                                    columns={auctioneerColumns}
                                    dataSource={auctioneers}
                                    enableSelection={userOfferExists == true ? false : true}
                                    defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                    sortable={false}
                                    onSelectionChange={onSelectionChange}
                                    enableKeyboardNavigation={false}
                                    toggleRowSelectOnClick={false}//
                                    defaultSelected={datagridDefaultSelected != undefined && datagridDefaultSelected != 0 ? datagridDefaultSelected : null}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                    selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                    rowClassName="auctionReactDataGridRows"
                                    showColumnMenuTool={false}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                    <div className='auctionReactDataGridSingleDiv'>
                        {cookies.auctioneerId != null && currentAuctioneer != [] && currentAuctioneer?.length != 0 ? 
                            <div >
                                <h3>{t("auctionYourOffer")}</h3>
                            {/* //currentAuctioneerColumns */}
                                <ReactDataGrid
                                    className='auctionReactDataGridSingle'
                                    idProperty="id"
                                    style={{minHeight: 43}}
                                    columns={currentAuctioneerColumns}
                                    dataSource={currentAuctioneer}
                                    enableSelection={true}
                                    // defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                                    sortable={false}
                                    // onSelectionChange={onSelectionChange}
                                    enableKeyboardNavigation={false}
                                    toggleRowSelectOnClick={false}//userOfferExists == true ? false : true {userOfferExists == true ? false : true}
                                    defaultSelected={datagridDefaultSelected != undefined && datagridDefaultSelected != 0 ? datagridDefaultSelected : null}// cookies?.auctioneerId != null ? cookies?.auctioneerId  : 0}
                                    selected={selectedRowId == 0 ? cookies.auctioneerId : selectedRowId}
                                    showHeader={false}
                                />
                            </div>
                            :
                            null
                        } 
                    </div>
                </div>
                <div className='auctionInputDiv' style={userOfferExists == true ? {'display':"block"} : null}>
                                {/* <Button onClick={()=>{setAuctioneerParticipateModal(true);}}>Participate</Button> */}
                                {isCreator == true ? 
                                    <div><Button disabled={selectedRow} onClick={()=>{deleteSelectedAuctioneer();}}>{t("auctionDeleteSelectedAuctioneer")}</Button></div>
                                :
                                null}
                    {userOfferExists == false && newUser == true ? 
                        <div className='auctionParticipateMainDiv'>
                            <div>


                            </div>

                        
                            <Form noValidate validated={participateValidated} onSubmit={handleParticipateSubmit} >
                                <div>
                                    <h3>{t("auctionCurrentHighest")}  {highestOffer != 0 ? highestOffer : 0}€</h3>
                                    <p>{t("auctionJoinAuction")}</p>
                                </div>
                                <div>
                                    <div className="auctionParticipateFormBodyDiv">
                                        <div>
                                            <Collapse in={igTagCollapse}>
                                                <div>
                                                    <Form.Label>{t("igTag")}</Form.Label>
                                                    <Form.Control required autoFocus className='Input' defaultValue={igTag} 
                                                        onBlur={(e)=>{ 
                                                            if(username == "")
                                                                setSuggestionUsername(e.target.value); 
                                                            setIgTag(e.target.value);}
                                                        } 
                                                    />
                                                </div>
                                            </Collapse>
                                            <Collapse in={phonenumberCollapse}>
                                                <div>
                                                    <Form.Label>{t("phonenumber")}</Form.Label>
                                                    <Form.Control className='Input' placeholder={t("phonenumber")} onChange={(e)=>{setPhonenumber(e.target.value);}} />

                                                </div>
                                            </Collapse>
                                            <a className='phonenumberCollapseTitle' onClick={(e)=>{e.preventDefault();setPhonenumberCollapse(!phonenumberCollapse); setIgTagCollapse(!igTagCollapse);}} href="#">
                                                {phonenumberCollapse == false ? 
                                                    t("auctionPhonenumberInstead")
                                                :
                                                    t("auctionIgTagInstead")
                                                }
                                            </a>


                                        </div>
                                        <div>
                                            <Form.Label>{t("username")}</Form.Label>
                                            <Form.Control required type="username" placeholder={t("username")} value={suggestionUsername} onChange={(e)=>{setUsername(e.target.value); setSuggestionUsername(e.target.value);}} />
                                        </div>

                                    </div>
                                    
                                    <div className="auctionParticipateFormBodyDiv">
                                        <div >
                                            <Form.Label>{t("password")}</Form.Label>
                                            <div className='auctionOfferFormPasswordDiv'>
                                                <Form.Control required type={passwordVisibility} placeholder={t("password")} onBlur={(e)=>{setPassword(e.target.value);}} />
                                                <button type='button' className="btn btn-primary" onClick={()=>{togglePasswordVisibility();}}>
                                                    {passwordVisibility === "password" ? (
                                                        <svg
                                                        width="20"
                                                        height="17"
                                                        fill="currentColor"
                                                        className="bi bi-eye-slash-fill"
                                                        viewBox="0 0 16 16"
                                                        >
                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                        width="20"
                                                        height="17"
                                                        fill="currentColor"
                                                        className="bi bi-eye-fill"
                                                        viewBox="0 0 16 16"
                                                        >
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            
                                            <Form.Label className='auctionOfferFormPasswordText'>
                                                {t("auctionPasswordDisclaimer")}
                                            </Form.Label>
                                            
                                        </div>
                                        <div >
                                            <Form.Label>{t("offer")}</Form.Label>
                                            <Form.Control required  type="number" placeholder={t("offer")} onBlur={(e)=>{setPrice(e.target.value);}} />
                                            <Form.Text >
                                                {t("auctionCurrentHighest")} {highestOffer != 0 ? highestOffer : 0}€
                                            </Form.Text>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div>
                                        <Button className='auctionRegisterButton' type='submit'>{t("save")}</Button>
                                        <p className='errorMessage'>{message}</p>
                                    </div>
                                    <a href="" onClick={(e)=>{e.preventDefault(); setNewUser(false);}}>{t("auctionMadeOfferYet")}</a>
                                </div>
                            </Form>
                        </div>
                        :   
                        null
                    }
                    {newUser == false ? 
                        <div  className='auctionModifyInputMainDiv' style={userOfferExists == true || userOfferExists == false ? {'maxWidth':"100%",'width':"100%"} : null}>

                                <div className='auctionModifyTitleDiv'>
                                    <h3>{t("auctionRaiseOffer")}</h3>
                                    {userOfferExists == false ? 
                                        <p>
                                            {t("auctionModifyDisclaimer")}
                                            {t("auctionCurrentHighest")} <b>{highestOffer != 0 ? highestOffer : 0}</b>€
                                        </p>
                                        :
                                        <p>
                                            {t("auctionRaiseOfferText")}
                                        </p>
                                    }
                                    {/* <Button className='auctionModifyRaiseButton' disabled={selectedRow} onClick={()=>{setShowAuctionModifyModal(true);}}>Raise</Button> */}
                                </div>

                            <div className='auctionModifyInputDiv'>
                                <Form noValidate validated={modifyValidated} onSubmit={handleModifySubmit} >
                                    <div className='auctionModifyFormInputs' style={userOfferExists == true ? {"display":"flex","flex-direction":"row","width":"100%"} : null}>

                                        <div className="auctionParticipateFormBodyDiv">
                                        {userOfferExists == false ? 
                                            <div >
                                                <Form.Label>{t("username")}</Form.Label>
                                                {/* cookies.auctioneerDefaultPrice != undefined && cookies.auctioneerDefaultPrice != 0 ? cookies.auctioneerDefaultPrice + '€': 0 + '€' */}
                                                <Form.Control required  value={usernameModify} placeholder={t("username")} onChange={(e)=>{setUsernameModify(e.target.value);}} />
                                                <Form.Text >
                                                    {t("auctionUsernameReminder")}
                                                </Form.Text>
                                                <Form.Control.Feedback type="invalid">
                                                    {t("auctionUsernameWarning")}
                                                </Form.Control.Feedback>
                                            </div>
                                        :null
                                        }
                                        <div>
                                            <Form.Label>{t("password")}</Form.Label>
                                            <div className='auctionOfferFormPasswordDiv'>
                                                <Form.Control required type={passwordVisibility} placeholder={t("password")} onBlur={(e)=>{setPasswordModify(e.target.value);}} />
                                                    <button type='button' className="btn btn-primary" onClick={()=>{togglePasswordVisibility();}}>
                                                        {passwordVisibility === "password" ? (
                                                            <svg
                                                                width="20"
                                                                height="17"
                                                                fill="currentColor"
                                                                className="bi bi-eye-slash-fill"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                width="20"
                                                                height="17"
                                                                fill="currentColor"
                                                                className="bi bi-eye-fill"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                <Form.Control.Feedback type="invalid">
                                                    {t("auctionPasswordWarning")}
                                                </Form.Control.Feedback>

                                                <Form.Text className="text-muted">
                                                {t("auctionPasswordReminder")}
                                                </Form.Text>
                                            </div>

                                        </div>
                                        <div className="auctionParticipateFormBodyDiv ">

                                            <div>
                                                <Form.Label>{t("offer")}</Form.Label>
                                                <div className='auctionFormInputs auctionModifySaveButtonDiv'>
                                                    {/* cookies.auctioneerDefaultPrice != undefined && cookies.auctioneerDefaultPrice != 0 ? cookies.auctioneerDefaultPrice + '€': 0 + '€' */}
                                                    {/* step={5} */}
                                                    <Form.Control required onWheel={(e) => e.target.blur()}  type="number" placeholder={"€"} onBlur={(e)=>{setPriceModify(e.target.value);}} />
                                                    <Button  type="submit" > {/*onClick={()=>{modifyAuction();}}*/}{t("save")}</Button>
                                                </div>
                                                <Form.Text >
                                                    {t("auctionCurrentHighest")} <b>{highestOffer != 0 ? highestOffer : 0}</b>€
                                                </Form.Text>
                                                <Form.Control.Feedback type="invalid">
                                                    {t("auctionOfferWarning")} <b>{highestOffer != 0 ? highestOffer : 0}</b>€
                                                </Form.Control.Feedback>
                                                <p className='errorMessage'>{message}</p>

                                            </div>
                                        </div>
                                        {userOfferExists == false ? 
                                        <a href="" onClick={(e)=>{e.preventDefault(); setNewUser(true);}}>{t("auctionRegisterOfferYet")}</a>
                                        : null}
                                    </div>
                                </Form>
                            </div>
                        </div>
                        :   
                        null
                    }
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
            <p>{t("auctionAuctionClosedError")}</p>
        </div>
    }
</div>
    )
}

export {Auction}