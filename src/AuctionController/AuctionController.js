import { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie';

import "react-datetime/css/react-datetime.css";
import './AuctionController.css';

import ReactDataGrid from '@inovua/reactdatagrid-community'

import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {handleInputChange} from  '../functions'


import Datetime from 'react-datetime';

const AuctionController = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [auctionItems, setAuctionItems] = useState(false);
    const [selectedRow, setSelectedRow] = useState(true);
    const [selectedRowValue, setSelectedRowValue] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginVisibilityModal, setLoginVisibilityModal] = useState(false);
    
    const [message, setMessage] = useState("");

    const [cookies, setCookie,removeCookie] = useCookies(['token']);
    
    const [auctionItemPostModal, setAuctionItemPostModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [imageFiles, setImageFiles] = useState(null);
    const [errors, setErrors] = useState([]);
    
    const [auctionItemDeleteModal, setAuctionItemDeleteModal] = useState(false);
    
    const [auctionItemModifyModal, setAuctionItemModifyModal] = useState(false);
    const [titleModify, setTitleModify] = useState("");
    const [descriptionModify, setDescriptionModify] = useState("");
    const [closingTimeModify, setClosingTimeModify] = useState("");
    const [visible, setVisible] = useState(1);
    const [selecetdImages, setSelectedImages] = useState([]);
    
    const [auctionItemVisibilityModal, setAuctionItemVisibilityModal] = useState(false);
    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"title" , header:"Title",  defaultFlex:2},
        {name:"description" , header:"Description", defaultFlex:2},
        {name:"visible" , header:"Visible", defaultFlex:1},
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
    
    //functions
    const resetValues = ()=>{
        setLoginVisibilityModal(false);
        setPassword("");
        setUsername("");

        setMessage("");

        setImageFiles(null);

        setAuctionItemPostModal(false);
        setClosingTime("");
        setDescription("");
        setTitle("");

        setAuctionItemModifyModal(false);
        setClosingTimeModify("");
        setDescriptionModify("");
        setTitleModify("");
        setVisible(1);
        setSelectedImages([]);

        setAuctionItemDeleteModal(false);

        setAuctionItemVisibilityModal(false);

        console.log("Reset");
    }

    const onSelectionChange = useCallback((e) => {
        setTitleModify(e.data?.title);
        setDescriptionModify(e.data?.description);
        setVisible(e.data.visible);
        setClosingTimeModify(e.data.closingTime);
        setSelectedRowValue(e.data);
        setSelectedRow(false);
    }, [])

    const applyErrorClass= field =>((field in errors && errors[field]===false)?' invalid-field':'')

    const setFileFromInput = e =>{
        if(e.target.files && e.target.files[0]){
            var files = [];
            Array.from(e.target.files).forEach(file => {
                files.push(file);
            });
            console.log(files);
            setImageFiles(files);
        }
        else{
            setImageFiles(null);
        }
    }

    //login
    const checkLoginStatus = async()=>{
        if(cookies.token != null){
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
    }

    const handleLogin = async() => {
        if(username != "" && password != ""){
            try{
                console.log("login ");
                let data = await fetch("https://localhost:44371/api/Login",{
                        method:'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body:JSON.stringify({username: username, password: password})
                    });
    
                let result = await data.json();
                
                if (result?.status == "Error") {
                    setMessage(result.message);
                    setUsername("");
                    setPassword("");
                    removeCookie('token',{ path: '/' });
                }
                else if(result?.status == "Ok"){
                    console.log("login onnistu");
                    resetValues();
                    setCookie('token', result.token, { path: '/' })
                    window.location.reload();
                }
            }
            catch{
                setMessage("Error");
            }
        }  
    }


//Auctionitem CRUD
    const postAuctionItem = async ()=>{
        if(title !== "" && description !== "" && closingTime !== "" && imageFiles!==null){
            console.log(imageFiles);
            const options = {
                method: 'POST',
                headers: {"Authorization": `Bearer ${cookies.token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title, 
                    description: description,
                    closingTime: closingTime//moment(closingTime).format('D.M.YYYY HH.MM.s')
                })
            }

            var search = await fetch("https://localhost:44371/api/AuctionItems",options);
            var result = await search.json();

            await postImages(result?.message);
        }
    }

    const fetchAuctionItems = async ()=>{
        if(cookies.token != null){
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
                        Visible: visible,
                        UserId: answer
                    })
                }
                console.log("Visible" + visible);

                search = await fetch("https://localhost:44371/api/AuctionItems/"+selectedRowValue.id, options);
                answer = await search.json();
                if(answer?.status == "Ok" && imageFiles != null){
                    console.log(answer.message);
                    postImages(answer.message);
                }
                else{
                    await fetchAuctionItems();
                    resetValues();
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const deleteAuctionItem= async()=>{
        if(auctionItemDeleteModal == true){
            try{
                const options = {
                    method: 'DELETE',
                    headers: {"Authorization": `Bearer ${cookies.token}`}
                }
                
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


    //Images CRUD
    const postImages = async (auctionItemId)=>{
                console.log("post image");
        if(auctionItemId != undefined && auctionItemId != 0){
            const uploadPromises = imageFiles.map( async (file)=>{
                console.log(file);

                const formData = new FormData();
                    formData.append("ImageFile",file);

                const options = {
                    method: 'POST',
                    headers: {"Authorization": `Bearer ${cookies.token}`},
                    body:formData
                }

                var search = await fetch("https://localhost:44371/api/Images/"+auctionItemId,options);
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

    const fetchImages = async()=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://localhost:44371/api/Images/"+selectedRowValue.id,options);
        var result = await search.json();
        if(result?.status != "Error" && result != undefined){
            setSelectedImages(await result);
        }
    }

    const deleteSelectedImage = async(imageUrl)=>{
        const options = {
            method: 'DELETE',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://localhost:44371/api/Images/?ImageUrl="+imageUrl,options);
        var result = await search.json();
        if(result?.status == "Ok"){
            await fetchImages();
        }
    }

    
    useEffect(()=>{
        if(auctionItemModifyModal == true){
            fetchImages();
        }
    },[auctionItemModifyModal]);

    useEffect(()=>{
        checkLoginStatus();
        fetchAuctionItems();
    },[]);

    const renderImages = selecetdImages.map((e)=>{
        return(<div>
            <img className='renderedImage' src={e}/>
            <CloseButton variant="white" onClick={()=>{deleteSelectedImage(e);}}></CloseButton>
        </div>)
    });

    return(
    <div className='auctionControllerMainDiv'>
        {loggedIn == true ? 
            <div>
                <h1>Auction controller</h1>
                <a href="/">controller</a>
        
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

                            <Modal.Header className="ModalHeader" >
                                <Modal.Title>Are you sure you want to delete the auctionitem</Modal.Title>
                                <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemDeleteModal(false);}}></CloseButton>
                            </Modal.Header>

                            <Modal.Body className="ModalBody">
                                <h3>This will delete the auctionitem, photos and auctioneers linked to this post <b>permanently.</b></h3>
                            </Modal.Body>
                            
                            <Modal.Footer className="ModalFooter">
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
                            <form>

                                <Modal.Header className="ModalHeader" >
                                    <Modal.Title>Add auctionitem</Modal.Title>
                                    <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemPostModal(false);}}></CloseButton>
                                </Modal.Header>

                                <Modal.Body className="ModalBody">
                                <div className='controllerFormInputs'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control placeholder='Title' onChange={(e)=>{setTitle(handleInputChange(e));}} />
                                </div>

                                <div className='controllerFormInputs'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder='Description' onChange={(e)=>{setDescription(handleInputChange(e));}} />
                                </div>


                                <div className='controllerFormInputs'>
                                    <Form.Label>Closing time</Form.Label>
                                    <Datetime 
                                        onChange={(e)=>{setClosingTime(e._d);}}
                                    />
                                    <Form.Text>
                                        Set when the auction bidding will close.
                                    </Form.Text>
                                </div>

                                <div>
                                    <input onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")} multiple></input>
                                </div>

                                </Modal.Body>
                                
                                <Modal.Footer className="ModalFooter">
                                <p className='errorMessage'>{message}</p>
                                    <Button variant="secondary" onClick={()=>{resetValues()}}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={()=>{postAuctionItem()}}  >  
                                    {/*  */}
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={auctionItemModifyModal} >

                            <Modal.Header className="ModalHeader">
                                <Modal.Title>Modify auctionitem</Modal.Title>
                                <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemModifyModal(false);}}></CloseButton>
                            </Modal.Header>

                            <Modal.Body className="ModalBody">
                            <div className='controllerFormInputs'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={titleModify} placeholder='Title' onChange={(e)=>{setTitleModify(handleInputChange(e));}} />
                            </div>

                            <div className='controllerFormInputs'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={descriptionModify} placeholder='Description' onChange={(e)=>{setDescriptionModify(handleInputChange(e));}} />
                            </div>

                            <div className='controllerFormInputs'>
                                <Form.Label >Visible</Form.Label>
                                <Form.Select value={visible} onChange={(e)=>{setVisible(e.target.value);}} >
                                    <option value={1}>true</option>
                                    <option value={0}>false</option>
                                </Form.Select>
                            </div>

                            <div className='controllerFormInputs'>
                                <Form.Label >Closing time</Form.Label>
                                <Datetime 
                                    value={closingTimeModify}
                                    onChange={(e)=>{setClosingTimeModify(e._d);}}
                                />
                                <Form.Text>
                                Set when the auction bidding will close.
                                </Form.Text>
                            </div>

                            <div>
                                <input onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")} multiple></input>
                            </div>

                            <div className='auctionControllerModifyImagesDiv'>
                                {renderImages}
                            </div>
                            </Modal.Body>
                            
                            <Modal.Footer className="ModalFooter">
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
                            <Modal.Header className="ModalHeader">
                                <Modal.Title>Change visibility</Modal.Title>
                                <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemVisibilityModal(false);}}></CloseButton>
                            </Modal.Header>
                            <Modal.Body className="ModalBody" >
                                <p>Are you sure you want to change the auctionitems visibility?</p>
                                <p>If the auctionitem is not visible it cannot be accessed by customers, or seen on the platform.</p>
                            </Modal.Body>
                            <Modal.Footer className="ModalFooter">
                                <Button onClick={()=>{resetValues();}}>Close</Button>
                                <Button onClick={()=>{changeAuctionItemVisibility();}}>Save</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            :
            <div className='auctionControllerLoginMainDiv'>
                <p>You dont have authorization to be here</p>
                <div>
                        <div>
                            <Button variant="primary" onClick={()=>{setLoginVisibilityModal(true);}}>
                                login
                            </Button>

                            <Modal show={loginVisibilityModal} >

                                <Modal.Header className="ModalHeader" >
                                    <Modal.Title>Login</Modal.Title>
                                    <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setLoginVisibilityModal(false);}}></CloseButton>
                                </Modal.Header>

                                <Modal.Body className="ModalBody">
                                <div className='controllerFormInputs'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder='Username' onChange={(e)=>{setUsername(handleInputChange(e));}} />
                                </div>

                                <div className='controllerFormInputs'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder='Password' onChange={(e)=>{setPassword(handleInputChange(e));}} />
                                    <Form.Text className="text-muted">
                                        Logging in is only available for administrators
                                    </Form.Text>
                                
                                    <p className='errorMessage'>{message}</p>
                                </div>


                                </Modal.Body>
                                
                                <Modal.Footer className="ModalFooter">
                                    <Button variant="secondary" onClick={()=>{setLoginVisibilityModal(false); }}>
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