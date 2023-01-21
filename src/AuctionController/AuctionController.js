import { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie';

import ReactDataGrid from '@inovua/reactdatagrid-community'

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {handleInputChange} from  '../functions'


const AuctionController = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [auctionItems, setAuctionItems] = useState(false);
    const [selectedRow, setSelectedRow] = useState(true);
    const [selectedRowValue, setSelectedRowValue] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    
    const [message, setMessage] = useState("");

    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    
    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"title" , header:"Title",  defaultFlex:2},
        {name:"description" , header:"Description", defaultFlex:2},
        {name:"active" , header:"Active", defaultFlex:1},
        {name:"closingTime" , header:"Closing Time", type: "number", defaultFlex:2},
        {name:"url" , header:"Url", defaultFlex:2}
    ]
    const resetValues = ()=>{
        setPassword("");
        setUsername("");
        setMessage("");
    }

    const handleLogin = async() => {
        if(username != "" && password != ""){
            try{
                let data = await fetch("https://localhost:44371/api/Login",{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify({username: username, password: password})
                    });
    
                    let result = await data.json();
                    
                    if (result?.status == "Error") {
                        setMessage(result.message);
                        resetValues();

                        console.log(result);
                    }
                    else if(result?.status == "Ok"){
                        resetValues();

                        setCookie('token', result.token, { path: '/' })
                        window.location.reload();
                    }
                resetValues();
                console.log(result);
            }
            catch{
                setMessage("Error");
            }
        }  
    }

    const checkLoginStatus = async()=>{
        const options = {
            method: 'GET',
            headers: { "Authorization": `Bearer ${cookies.token}`}
        }
        let data = await fetch("https://localhost:44371/api/Login", options);
        let loggedIn = await data.json();
        if(loggedIn == true){
            setLoggedIn(loggedIn);
        }
    }

    
    const fetchAuctionItems = async ()=>{
        const options = {
            method: 'GET',
            headers: { "Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://localhost:44371/api/AuctionItems",options);
        var auctionItems = await search.json();
        if(auctionItems != null || auctionItems != undefined){
            setAuctionItems(await auctionItems);
        }
    }

    const onSelectionChange = useCallback((e) => {
        setSelectedRowValue(e.data);
        setSelectedRow(false);
    }, [])

    useEffect(()=>{
        checkLoginStatus();
        fetchAuctionItems();
    },[]);

    return(
    <div>
        {loggedIn == true ? 
            <div>
                <div>
                    <ReactDataGrid
                        idProperty="id"
                        style={{ minHeight: 450, minWidth: 500 }}
                        columns={columns}
                        dataSource={auctionItems}
                        enableSelection={false}
                        defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                        sortable={false}
                        onSelectionChange={onSelectionChange}
                        
                        />
                </div>
                <div>
                <Button variant="primary" onClick={()=>{removeCookie('token',{ path: '/' });}}>
                    logout
                </Button>
                </div>
            </div>
            :
            <div>
                <p>You dont have authorization to be here</p>
                <div>
                        <div>
                            <Button variant="primary" onClick={()=>{setShow(true);}}>
                                login
                            </Button>

                            <Modal show={show} >

                                <Modal.Header closeButton>
                                    <Modal.Title>Login</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                <div className='homeFormInputs'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder='Username' onChange={(e)=>{setUsername(handleInputChange(e));}} />
                                </div>

                                <div className='homeFormInputs'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder='Password' onChange={(e)=>{setPassword(handleInputChange(e));}} />
                                    <Form.Text className="text-muted">
                                        Logging in is only available for administrators
                                    </Form.Text>
                                
                                    <p className='errorMessage'>{message}</p>
                                </div>


                                </Modal.Body>
                                
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>{setShow(false); }}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={()=>{handleLogin()}}>
                                        Login
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
            </div>}
       
    </div>);
}

export{AuctionController}