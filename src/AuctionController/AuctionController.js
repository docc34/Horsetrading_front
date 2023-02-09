import { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie';

import "react-datetime/css/react-datetime.css";
import './AuctionController.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {handleInputChange} from  '../functions'

import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import moment from 'moment'
import Datetime from 'react-datetime';

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
    
    const [auctionItemPostModal, setAuctionItemPostModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [closingTime, setClosingTime] = useState("");

    const [auctionItemDeleteModal, setAuctionItemDeleteModal] = useState(false);
    
    const [auctionItemModifyModal, setAuctionItemModifyModal] = useState(false);
    const [auctionItemModify, setAuctionItemModify] = useState([]);
    const [titleModify, setTitleModify] = useState("");
    const [descriptionModify, setDescriptionModify] = useState("");
    const [closingTimeModify, setClosingTimeModify] = useState("");
    const [active, setActive] = useState(1);

    const [auctionItemVisibilityModal, setAuctionItemVisibilityModal] = useState(false);
    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"title" , header:"Title",  defaultFlex:2},
        {name:"description" , header:"Description", defaultFlex:2},
        {name:"active" , header:"Active", defaultFlex:1},
        {name: 'closingTime',header: 'Closing Time', defaultFlex:2,},
        {name:"url" , header:"Url", defaultFlex:2, render: ({value}) => {
            return <a href={value}>Auction</a>
        }}
    ]
    // {
    //     name: 'created',header: 'Created',defaultWidth: 150,
    //     // need to specify dateFormat
    //     dateFormat: 'YYYY-MM-DD, HH:mm',
    //     filterEditor: DateFilter,
    //     filterEditorProps: (props, { index }) => {
    //       // for range and notinrange operators, the index is 1 for the after field
    //       return {
    //         dateFormat: 'YYYY-MM-DD, HH:mm',
    //         placeholder: index == 1 ? 'Last login date is before...': 'Last login date is after...'
    //       }
    //     },
    //     //Momentjs formats the date
    //     render: ({ value, cellProps: { dateFormat } }) =>
    //       moment(value).format(dateFormat),
    // },
    
    const resetValues = ()=>{
        setPassword("");
        setUsername("");
        setMessage("");
        setClosingTime("");
        setDescription("");
        setTitle("");
        setShow(false);
        setAuctionItemPostModal(false);
        setAuctionItemModifyModal(false);
        setAuctionItemDeleteModal(false);
        setAuctionItemVisibilityModal(false);
    }

    const changeAuctionItemVisibility = async ()=>{
        const options = {
            method: 'PUT',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }

        var search = await fetch("https://localhost:44371/api/AuctionItems/Visibility/"+selectedRowValue.id,options);
        var data = await search.json();
        if(data?.status == "Ok"){
            await fetchAuctionItems();
            resetValues();
        }
        else{
            setMessage(data?.message);
        }
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
                    }
                    else if(result?.status == "Ok"){
                        resetValues();
                        setCookie('token', result.token, { path: '/' })
                        window.location.reload();
                    }
                resetValues();
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

    const postAuctionItem = async ()=>{
        if(title != "" && description != "" && closingTime != ""){
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',"Authorization": `Bearer ${cookies.token}`},
                body:JSON.stringify({
                    Title: title,
                    Description:description,
                    ClosingTime: closingTime,
                    Active: 1
                })
            }
            var search = await fetch("https://localhost:44371/api/AuctionItems",options);
            var result = await search.json();
            if(result?.status == "Ok"){
                await fetchAuctionItems();
                resetValues();
            }
            else{
                setMessage(result?.message);
            }
        }
    }
    
    const deleteAuctionItem= async()=>{
        if(auctionItemDeleteModal == true){
            try{
                const options = {
                    method: 'DELETE',
                    headers: {"Authorization": `Bearer ${cookies.token}`}
                }
                console.log(selectedRowValue);
                var search = await fetch("https://localhost:44371/api/AuctionItems/"+selectedRowValue.id,options);
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

    const fetchAuctionItems = async ()=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://localhost:44371/api/AuctionItems/User",options);
        var auctionItems = await search.json();
        if(auctionItems != null || auctionItems != undefined){
            setAuctionItems(await auctionItems);
        }
    }

    const modifyAuctionItem = async()=>{
        try{
            if(titleModify != "" && descriptionModify != "" && closingTimeModify != ""){
                
                var search = await fetch("https://localhost:44371/api/UserId", {
                    method: 'GET',
                    headers: {"Authorization": `Bearer ${cookies.token}`}
                });
                var answer = await search.json();
                
                const options = {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${cookies.token}` },
                    body:JSON.stringify({
                        Title: titleModify,
                        Description:descriptionModify,
                        ClosingTime: closingTimeModify,
                        Active: active,
                        UserId: answer
                    })
                }

                search = await fetch("https://localhost:44371/api/AuctionItems/"+selectedRowValue.id, options);
                answer = await search.json();
                if(answer.status == "Ok"){
                    await fetchAuctionItems();
                    resetValues();
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }
    const onSelectionChange = useCallback((e) => {
        
        setTitleModify(e.data?.title);
        setDescriptionModify(e.data?.description);
        setActive(e.data.active);
        setClosingTimeModify(e.data.closingTime);
        setSelectedRowValue(e.data);
        setSelectedRow(false);
    }, [])

    useEffect(()=>{
        checkLoginStatus();
        fetchAuctionItems();
    },[]);

    return(
    <div className='AuctionControlleMainDiv'>
        {loggedIn == true ? 
            <div>
                <h1>Auction controller</h1>
                <a href="/">Home</a>
        
                <div>
                    <ReactDataGrid
                        idProperty="id"
                        style={{ minHeight: 450, minWidth: 500 }}
                        columns={columns}
                        dataSource={auctionItems}
                        enableSelection={true}
                        defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
                        sortable={false}
                        onSelectionChange={onSelectionChange}
                        />
                </div>
                <div>
                    <Button variant="primary" onClick={()=>{removeCookie('token',{ path: '/' }); window.location.reload();}}>logout</Button>
                    <Button variant="primary" onClick={()=>{setAuctionItemPostModal(true);}}>Add auctionitem</Button>
                    <Button disabled={selectedRow} onClick={()=>{setAuctionItemDeleteModal(true);}}>Delete auctionitem</Button>
                    <Button disabled={selectedRow} onClick={()=>{setAuctionItemModifyModal(true);}}>Modify auctionitem</Button>
                    <Button disabled={selectedRow} onClick={()=>{setAuctionItemVisibilityModal(true);}}>Change auctionitem visibility</Button>
                    
                    <div>
                        <Modal show={auctionItemDeleteModal} >

                            <Modal.Header closeButton>
                                <Modal.Title>Are you sure you want to delete the auction item</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>This will delete the auction item, photos and auctioneers linked to this post permanently.</p>

                            </Modal.Body>
                            
                            <Modal.Footer>
                            <p className='errorMessage'>{message}</p>
                                <Button variant="secondary" onClick={()=>{setAuctionItemDeleteModal(false);}}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={()=>{deleteAuctionItem()}}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={auctionItemPostModal} >

                            <Modal.Header closeButton>
                                <Modal.Title>Add auction item</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                            <div className='homeFormInputs'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control placeholder='Title' onChange={(e)=>{setTitle(handleInputChange(e));}} />
                            </div>

                            <div className='homeFormInputs'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder='Description' onChange={(e)=>{setDescription(handleInputChange(e));}} />
                            </div>

                            <div className='homeFormInputs'>
                                <Form.Label>Closing time</Form.Label>
                                <Datetime 
                                    onChange={(e)=>{setClosingTime(e._d);}}
                                />
                                <Form.Text>
                                    Aika jolloin huutokauppaus suljetaan
                                </Form.Text>
                            </div>

                            </Modal.Body>
                            
                            <Modal.Footer>
                            <p className='errorMessage'>{message}</p>
                                <Button variant="secondary" onClick={()=>{resetValues()}}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={()=>{postAuctionItem()}}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={auctionItemModifyModal} >

                            <Modal.Header closeButton>
                                <Modal.Title>Add auction item</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                            <div className='homeFormInputs'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={titleModify} placeholder='Title' onChange={(e)=>{setTitleModify(handleInputChange(e));}} />
                            </div>

                            <div className='homeFormInputs'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={descriptionModify} placeholder='Description' onChange={(e)=>{setDescriptionModify(handleInputChange(e));}} />
                            </div>

                            <div className='homeFormInputs'>
                                <Form.Label>Active</Form.Label>
                                <Form.Select value={active} onChange={(e)=>{setActive(e.target.value);}} >
                                    <option value={1}>true</option>
                                    <option value={0}>false</option>
                                </Form.Select>
                            </div>

                            <div className='homeFormInputs'>
                                <Form.Label>Closing time</Form.Label>
                                <Datetime 
                                    value={closingTimeModify}
                                    onChange={(e)=>{setClosingTimeModify(e._d);}}
                                />
                                <Form.Text>
                                    Aika jolloin huutokauppaus suljetaan
                                </Form.Text>
                            </div>

                            </Modal.Body>
                            
                            <Modal.Footer>
                            <p className='errorMessage'>{message}</p>
                                <Button variant="secondary" onClick={()=>{resetValues()}}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={()=>{modifyAuctionItem()}}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                
                    <div>
                        <Modal show={auctionItemVisibilityModal}>
                            <Modal.Header>
                                <Modal.Title>Change visibility</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to change the auctionitems visibility?</p>
                                <p>If the auctionitem is not visible it cannot be accessed by customers, or seen on the platform.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{resetValues();}}>Close</Button>
                                <Button onClick={()=>{changeAuctionItemVisibility();}}>Save</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
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