import { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie';

import "react-datetime/css/react-datetime.css";
import './AuctionController.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'

import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import 'moment-timezone';
import { NavLink } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PasswordVisibilityButton} from '../components/PasswordVisibilityButton'
import {AuctionControllerPost} from './Modals/AuctionControllerPost';
import {AuctionControllerModify} from './Modals/AuctionControllerModify';

const AuctionController = ()=>{
    const {t} = useTranslation();
    const [cookies, setCookie,removeCookie] = useCookies(['token']);

    const [loginValidated, setLoginValidated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [auctionItems, setAuctionItems] = useState(false);
    const [selectedRow, setSelectedRow] = useState(true);
    const [selectedRowValue, setSelectedRowValue] = useState("");
    
    const [message, setMessage] = useState("");

    const [showMessageAlert, setShowMessageAlert] = useState(false);

    const [auctionItemDeleteModal, setAuctionItemDeleteModal] = useState(false);

    const [auctionItemVisibilityModal, setAuctionItemVisibilityModal] = useState(false);

    const [usersBills, setUsersBills] = useState([]);
    const [billsMessage, setBillsMessage] = useState("");
    
    const [userId, setUserId] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    
    const auctionItemsColumns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"title" , header:"Title",  defaultFlex:2},
        {name:"description" , header:"Description", defaultVisible: false},
        {name:"saleType" , header:"Saletype", defaultFlex:2 },
        {name:"visible" , header:"Visible",  defaultFlex:1},
        {name:"saleTypeId" , header:"saleTypeId", defaultVisible: false },
        {name:"auctionDurationMinutes" , header:"auctionDurationMinutes" ,  defaultVisible: false},
        {name:"startClosingTimeOnBid" , header:"Start countdown on bid",  defaultFlex:1 },
        {name:"openBiddingTime" , header:"Auction unlock date", defaultFlex:2 },
        {name: 'closingTime',header: 'Closing Time', defaultFlex:2,},
        {name:"raiseClosingTimeInterval" , header:"Closing time interval" ,  defaultFlex:1},
        {name:"url" , header:"Url", defaultFlex:1, render: ({value}) => {
            return <a href={value}>Auction</a>
        }}
    ]
    const billsColumns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"auctionItemName" , header:"Name",  defaultFlex:1},
        {name:"winner" , header:"Auction winner", defaultFlex:2},
        {name:"winnerOffer" , header:"Winning offer", defaultFlex:1},
        {name:"amount" , header:"Amount",  defaultFlex:1},
        {name:"billDue" , header:"Bill Due", defaultFlex:2},
        {name:"destinationIban",header: "Destination IBAN", defaultFlex:3},
        {name:"paid" , header:"Is the bill paid", defaultFlex:1},
        {name:"billDate" , header:"Bill date", defaultFlex:2},
        // {name:"url" , header:"Url", defaultFlex:2, render: ({value}) => {
        //     return <a href={value}>Auction</a>
        // }}
    ]

    const handleLoginSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setLoginValidated(true);
        }
        else{
            event.preventDefault();
            //Take userdata from form using the name attribute given to inputs.
            //This is done to enable use of autofill
            handleLogin({
                email: event.target.email.value,
                password: event.target.password.value
            });

            setLoginValidated(false);
        }
    };


    //functions
    const resetValues = ()=>{
        setMessage("");

        setAuctionItemDeleteModal(false);

        setAuctionItemVisibilityModal(false);
    }

    const onSelectionChange = useCallback((e) => {
        setSelectedRowValue(e?.data);
        setSelectedRow(false);
    }, [])


    //login
    const checkLoginStatus = async()=>{
        if(cookies.token != null){
            const options = {
                method: 'GET',
                headers: { "Authorization": `Bearer ${cookies.token}`}
            }
            let data = await fetch("https://horsetradingapidev.azurewebsites.net/api/Login", options);
            let loggedIn = await data.json();
            if(loggedIn == true){
                setLoggedIn(loggedIn);
            }
        }
    }

    const handleLogin = async(loginBody) => {
        try{
            let data = await fetch("https://horsetradingapidev.azurewebsites.net/api/Login",{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(loginBody)
                });

            let result = await data.json();
            
            if (result?.status == "Error") {
                setMessage(result.message);          
                removeCookie('token',{ path: '/' });
            }
            else if(result?.status == "Ok"){

                resetValues();
                setCookie('token', result.token, { path: '/' })
                window.location.reload();
            }
        }
        catch{
            setMessage("Error");
        }
    }

//Bills CR

    const postUsersBills = async()=>{
        if(usersBills?.length == 0){
            const options = {
                method: 'POST',
                headers: {"Authorization": `Bearer ${cookies.token}`}
            }

            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Bills/CheckUsersBills",options);
            var result = await search.json();
            
            if(result?.status == "Error" && result?.message == "No new billable items found"&& result?.object?.value != null){
                setUsersBills(result?.object?.value);
                setBillsMessage(result?.message);
            }
            else if(result?.status == "Error"){
                await getUsersBills();
                setBillsMessage(result?.message);
            }
            else if(result?.status == "Ok" && result != null){
                setShowMessageAlert(true);
                setBillsMessage(result?.message);
                setUsersBills(result?.object?.value);
                // await fetchUsersBills();
            }

            else{
                setBillsMessage(result?.message);
            }
        }
    }

    const getUsersBills = async ()=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }

        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Bills/User",options);
        var result = await search.json();
        if(result?.status != "Error"){
            setUsersBills(result);
            // await fetchUsersBills();
        }
    }


    const fetchAuctionItems = async ()=>{
        if(cookies.token != null){
            const options = {
                method: 'GET',
                headers: {"Authorization": `Bearer ${cookies.token}`}
            }
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/User",options);
            var auctionItems = await search.json();
            if(auctionItems?.status == "Error"){
                setMessage(auctionItems?.message == "Error");
            }
            else if(auctionItems != null && auctionItems != undefined && auctionItems != []&& auctionItems?.length != 0 ){
                setAuctionItems(await auctionItems);
                
                setUserId(await auctionItems[0]?.userId);
            }
            
        }
    }

    const changeAuctionItemVisibility = async ()=>{
        const options = {
            method: 'PUT',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }

        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/Visibility/"+selectedRowValue.id,options);
        var data = await search.json();
        if(data?.status == "Ok"){
            await fetchAuctionItems();
            resetValues();
        }
        else{
            setMessage(data?.message);
        }
    }


    const deleteAuctionItem= async()=>{
        if(auctionItemDeleteModal == true){
            try{
                const options = {
                    method: 'DELETE',
                    headers: {"Authorization": `Bearer ${cookies.token}`}
                }
                
                var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/"+selectedRowValue.id,options);
                var data = await search.json();
                if(data?.status == "Ok"){
                    await fetchAuctionItems();
                    resetValues();
                }
            }
            catch(e){

            }
        }
    }


    //Images CRUD
    const postImages = async (auctionItemId, imageFiles)=>{
        if(auctionItemId != undefined && auctionItemId != 0){
            const uploadPromises = imageFiles.map( async (file)=>{

                const formData = new FormData();
                    formData.append("ImageFile",file);

                const options = {
                    method: 'POST',
                    headers: {"Authorization": `Bearer ${cookies.token}`},
                    body:formData
                }

                var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Images/"+auctionItemId,options);
            });

            Promise.all(uploadPromises).then(async ()=>{
                await fetchAuctionItems();
                resetValues();
            });
        }
        else{
            setMessage(auctionItemId);
        }
    }

    useEffect(()=>{
        checkLoginStatus();
        fetchAuctionItems();
        postUsersBills();
    },[]);



    const changeRowColor = (rowProps) => {
        if(rowProps.data.paid == 0) {
            rowProps.style.background = '#EB4242';
        } else (
            rowProps.style.background = '#00FF00'
        )
    }

    return(
    <div className='auctionControllerMainDiv'>
        {loggedIn == true ? 
            <div>
                <h1>{t("auctionControllerAuctionController")}</h1>
                <a href={'user/?userId='+userId}>{t("auctionControllerProfileLink")}</a>
                <div className='auctionControllerContentMainDiv'>
                    <div>
                        <Modal show={showMessageAlert}>
                            <Alert show={true} variant="success">
                                <Alert.Heading>{t("auctionControllerMessageTitle")}</Alert.Heading>
                                <p>{message}</p>
                                <br/>
                                <p>{t("auctionControllerBillsMessage")}</p>
                                <hr />

                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => setShowMessageAlert(false)} variant="outline-success">Ok</Button>
                                </div>
                            </Alert>
                        </Modal>

                        <h2>{t("auctionControllerAuctionItemsTitle")}</h2>
                        <div>
                            <ReactDataGrid
                                idProperty="id"
                                style={{minHeight: 43+ 40 * auctionItems?.length, minWidth: 500 }}
                                columns={auctionItemsColumns}
                                dataSource={auctionItems}
                                defaultSortInfo={[{name: "closingTime",  dir: -1, type: 'date'},{name: "visible",  dir: -1, type: 'date'}]}
                                onSelectionChange={onSelectionChange}
                                enableSelection={true}
                                sortable={false}
                                showColumnMenuTool={false}
                            />
                        </div>
                        <div>
                            <div className='auctionControllerButtonsDiv'>
                                <AuctionControllerPost postImages={postImages}/>
                                <Button disabled={selectedRow} onClick={()=>{setAuctionItemDeleteModal(true);}}>{t("delete")}</Button>
                                <AuctionControllerModify selectedRowValue={selectedRowValue} fetchAuctionItems={fetchAuctionItems} postImages={postImages} selectedRow={selectedRow}/>
                                <Button disabled={selectedRow} onClick={()=>{setAuctionItemVisibilityModal(true);}}>{t("auctionControllerChangeVisibilityTitle")}</Button>
                            </div>
                            <div>
                                <Modal show={auctionItemDeleteModal} >

                                    <Modal.Header className="ModalHeader" >
                                        <Modal.Title>{t("auctionControllerDeleteItemModalTitle")}</Modal.Title>
                                        <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemDeleteModal(false);}}></CloseButton>
                                    </Modal.Header>

                                    <Modal.Body className="ModalBody">
                                        <h3>{t("auctionControllerDeleteItemModalBody")}</h3>
                                    </Modal.Body>
                                    
                                    <Modal.Footer className="ModalFooter">
                                        <p className='errorMessage'>{message}</p>
                                        <Button variant="secondary" onClick={()=>{setAuctionItemDeleteModal(false);}}>
                                            {t("cancel")}
                                        </Button>
                                        <Button variant="primary" onClick={()=>{deleteAuctionItem()}}>
                                            {t("delete")}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>


                            <div>
                                <Modal show={auctionItemVisibilityModal}>
                                    <Modal.Header className="ModalHeader">
                                        <Modal.Title>{t("auctionControllerChangeVisibilityTitle")}</Modal.Title>
                                        <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemVisibilityModal(false);}}></CloseButton>
                                    </Modal.Header>
                                    <Modal.Body className="ModalBody" >
                                        <p>{t("auctionControllerChangeVisibilityDescription1")}</p>
                                        <p>{t("auctionControllerChangeVisibilityDescription2")}</p>
                                    </Modal.Body>
                                    <Modal.Footer className="ModalFooter">
                                        <Button onClick={()=>{resetValues();}}>
                                            {t("close")}
                                        </Button>
                                        <Button onClick={()=>{changeAuctionItemVisibility();}}>
                                            {t("save")}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className='auctionControllerBillsReactDataGridDiv'>
                        <h2>{t("bills")}</h2>
                        <p>{t("auctionControllerBillsDescription")}</p>
                        <ReactDataGrid
                            idProperty="id"
                            className='auctionControllerBillsReactDataGrid'
                            style={{ minHeight: 43+ 40 * usersBills?.length }}
                            columns={billsColumns}
                            dataSource={usersBills}
                            defaultSortInfo={[{name: "paid",  dir: -1, type: 'number'},{name: "billDate",  dir: -1, type: 'date'}]}
                            onSelectionChange={onSelectionChange}
                            onRenderRow={changeRowColor}
                            enableSelection={false}
                            sortable={false}
                            showColumnMenuTool={false}
                            />
                        <p>{billsMessage}</p>
                    </div>
                </div>
            </div>
            :
            <div className='auctionControllerLoginMainDiv'>
                <h4>{t("auctionControllerLoginTitle")}</h4>
                <div className='auctionControllerLoginButtonDiv'>
                    <div>
                        <Form noValidate validated={loginValidated} onSubmit={handleLoginSubmit}>
                            <div>
                                    <div className='loginControllerFormInputs'>
                                        <Form.Label>{t("email")}</Form.Label>
                                        <Form.Control autoFocus required name='email' placeholder={t("email")}/>
                                    </div>

                                    <div className='loginControllerFormInputs'>
                                        <Form.Label>{t("password")}</Form.Label>
                                        <div className='auctionOfferFormPasswordDiv'>
                                        <Form.Control required name='password' type={passwordVisibility} placeholder={t("password")} />
                                        <PasswordVisibilityButton passwordVisibility={passwordVisibility} setPasswordVisibility={(e)=>{setPasswordVisibility(e)}}/>
                                    </div>
                                        <Form.Text className="text-muted">
                                            {t("auctionControllerLoginDisclaimer")}
                                        </Form.Text>
                                    
                                        <p className='errorMessage'>{message}</p>
                                    </div>
                            </div>

                            <Button autoFocus variant="primary" type='submit'>
                                {t("login")}
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>}
       
    </div>);
}

export{AuctionController}