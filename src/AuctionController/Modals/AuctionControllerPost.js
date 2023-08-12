import { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie';

import '../AuctionController.css';

import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

import Datetime from 'react-datetime';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';

const AuctionControllerPost=(e)=>{
    const {t} = useTranslation();
    const [cookies] = useCookies(['token']);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    const [auctionItemCreateValidated, setAuctionItemCreateValidated] = useState(false);
    const [auctionItemPostModal, setAuctionItemPostModal] = useState(false);

    const [openBiddingTime, setOpenBiddingTime] = useState(null);
    const [imageFiles, setImageFiles] = useState(null);
    const [auctionItemType, setAuctionItemType] = useState(1);
    const [startClosingTimeOnBid, setStartClosingTimeOnBid] = useState(null);
    const [visible, setVisible] = useState(1);

    const [auctionItemNowDisabled, setAuctionItemNowDisabled] = useState(false);
    const [auctionItemOfferDisabled, setAuctionItemOfferDisabled] = useState(false);
    const [auctionItemTimerDisabled, setAuctionItemTimerDisabled] = useState(false);

    const [loading, setLoading] = useState(false);
    //functions
    const applyErrorClass= field =>((field in errors && errors[field]===false)?' invalid-field':'');
    
    const setFileFromInput = e =>{
        if(e.target.files && e.target.files[0]){
            var files = [];
            Array.from(e.target.files).forEach(file => {
                files.push(file);
            });
            
            setImageFiles(files);
        }
        else{
            setImageFiles(null);
        }
    }

    const resetValues = ()=>{
        setMessage("");

        setOpenBiddingTime(null);
        setStartClosingTimeOnBid(null);
        setAuctionItemType(1);
        setVisible(1);
        setImageFiles(null);

        setAuctionItemPostModal(false);
        setAuctionItemNowDisabled(false);
        setAuctionItemOfferDisabled(false);
        setAuctionItemTimerDisabled(false);
        setLoading(false);
    }

    //Reads the values straight from the form
    const handleCreateAuctionItemSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setAuctionItemCreateValidated(true);
        }
        
        //Checks that an image has been selected and that the time is valid
        var auctionItemTotalMinutes = Number.parseInt(event.target.auctionItemHours.value) * 60;
        if(event.target.auctionItemMinutes?.value != null && event.target.auctionItemMinutes?.value != "" && event.target.auctionItemMinutes?.value != undefined)
            auctionItemTotalMinutes = auctionItemTotalMinutes + Number.parseInt(event.target.auctionItemMinutes?.value);

        if(auctionItemTotalMinutes <= 0 || imageFiles == null){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            setLoading(true);
            event.preventDefault();
            postAuctionItem({
                title: event.target.title.value, 
                description: event.target.description.value,
                auctionDurationMinutes: auctionItemTotalMinutes,
                startClosingTimeOnBid: startClosingTimeOnBid,
                openBiddingTime: openBiddingTime,
                visible: visible,
                saleTypeId: auctionItemType,
                startingPrice: event.target.startingPrice.value != "" && event.target.startingPrice.value != null ? event.target.startingPrice.value : 0,
                raiseClosingTimeInterval: event.target.auctionItemRaisePeriod.value != "" ? event.target.auctionItemRaisePeriod.value : 0//moment(closingTime).format('D.M.YYYY HH.MM.s')
            })
            setAuctionItemCreateValidated(false);
        }
    };

    //Auctionitem C
    const postAuctionItem = async (postBody)=>{
        const options = {
            method: 'POST',
            headers: {"Authorization": `Bearer ${cookies.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(postBody)
        }

        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems",options);
        var result = await search.json();
        if(result.status == "Error" || result == null){
            setLoading(false);
            setMessage(result?.message);
        }
        else{
            await e.postImages(result?.message, imageFiles);
            resetValues();
        }
    }

    return(<div>
        <Button variant="primary" onClick={()=>{setAuctionItemPostModal(true);}}>{t("auctionControllerAddAuctionItem")}</Button>

        <Modal show={auctionItemPostModal} >
            <Form noValidate validated={auctionItemCreateValidated} onSubmit={handleCreateAuctionItemSubmit} >

                <Modal.Header className="ModalHeader" >
                    <Modal.Title>{t("auctionControllerAddAuctionItem")}</Modal.Title>
                    <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemPostModal(false);}}></CloseButton>
                </Modal.Header>

                <Modal.Body className="ModalBody">
                <div className='controllerFormInputs'>
                    <Form.Label>{t("title")} </Form.Label>
                    <Form.Control required placeholder={t("title")} name='title' />
                </div>

                <div>
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control required as="textarea" placeholder={t("description")} name='description' />
                </div>

                <div className='controllerFormInputs'>
                    <Form.Label>{t("hidden")}</Form.Label>
                    <Form.Select value={visible} onChange={(e)=>{setVisible(e.target.value);}} >
                        <option value={1}>{t("no")}</option>
                        <option value={0}>{t("yes")}</option>
                    </Form.Select>
                    <Form.Text>
                        {t("auctionControllerHiddenDescription")}
                    </Form.Text>
                </div>

                <div className='controllerFormInputs'>
                    <Form.Label >{t("type")}</Form.Label>
                    <Form.Select value={auctionItemType} onChange={(e)=>{setAuctionItemType(e.target.value);}} >
                        <option value={1}>{t("commission")}</option>
                        <option value={2}>{t("purchase")}</option>
                    </Form.Select>
                </div>

                <div className='controllerFormInputs'>
                    <Form.Label>{t("auctionControllerStartingPrice")}</Form.Label>
                    <Form.Control onWheel={(e)=>{e.target.blur()}} min={0}  placeholder='0€' type='number' name='startingPrice' />
                    <Form.Text>
                        {t("auctionControllerStartingPriceDescription")}
                    </Form.Text>
                </div>

                <div className='controllerFormInputs'>
                    <Form.Label>How long will the auction last once its started.</Form.Label>
                    
                    <Form.Control required onWheel={(e)=>{e.target.blur()}} min={0} placeholder={"0 Hours"}  type='number'  name='auctionItemHours' />
                    <Form.Text>
                        Defines how many hours the auction will last, once its been opened.
                    </Form.Text>
                    <Form.Control onWheel={(e)=>{e.target.blur()}} min={0} placeholder={t("auctionControllerRaisePeriodPlaceHolder")}  type='number' max={60} name='auctionItemMinutes' />
                    <Form.Text>
                        Defines how many minutes the auction will last, once its been opened.
                    </Form.Text>
                </div>

                <div className='controllerFormInputs'>
                    <Form.Label>{t("auctionControllerRaisePeriod")}</Form.Label>
                    <Form.Control onWheel={(e)=>{e.target.blur()}} min={0} placeholder={t("auctionControllerRaisePeriodPlaceHolder")}  type='number' max={60} name='auctionItemRaisePeriod' />
                    <Form.Text>
                        {t("auctionControllerRaisePeriodDescription")}
                    </Form.Text>
                </div>

                <div className='controllerFormInputs'>
                    <h3>When will the timer start to go down?</h3>
                    <div className='auctionControllerPostCheckbox'>
                        <Form.Label htmlFor='auctionPostCheckNow'>Now</Form.Label>
                        <Form.Check id="auctionPostCheckNow" disabled={auctionItemNowDisabled} onClick={(e)=>{ 
                            var checked = e.target.checked; 
                            if(checked == false){
                                setAuctionItemNowDisabled(false);
                                setAuctionItemOfferDisabled(false);
                                setAuctionItemTimerDisabled(false);
                            }
                            else{
                                setAuctionItemNowDisabled(false);
                                setAuctionItemOfferDisabled(true);
                                setAuctionItemTimerDisabled(true);
                            }
                        }}></Form.Check>
                    </div>

                    <div  className='auctionControllerPostCheckbox'>
                        <Form.Label htmlFor='auctionPostCheckOffer'>After the first offer is made</Form.Label>
                        <Form.Check id="auctionPostCheckOffer" disabled={auctionItemOfferDisabled} onClick={(e)=>{ 
                            var checked = e.target.checked;
                             
                            if(checked == false){
                                setAuctionItemNowDisabled(false);
                                setAuctionItemOfferDisabled(false);
                                setAuctionItemTimerDisabled(false);

                                setStartClosingTimeOnBid(null);
                            }
                            else{
                                setAuctionItemNowDisabled(true);
                                setAuctionItemOfferDisabled(false);
                                setAuctionItemTimerDisabled(true);

                                setStartClosingTimeOnBid(1);
                            }
                        }}></Form.Check>
                    </div>
                    <div>
                        <div className='auctionControllerPostCheckbox'>
                            <Form.Label htmlFor='auctionPostCheckTimer'>After this date</Form.Label>
                            <Form.Check id="auctionPostCheckTimer" disabled={auctionItemTimerDisabled} onClick={(e)=>{ 
                                var checked = e.target.checked; 
                                if(checked == false){
                                    setAuctionItemNowDisabled(false);
                                    setAuctionItemOfferDisabled(false);
                                    setAuctionItemTimerDisabled(false);

                                    setOpenBiddingTime(null);
                                }
                                else{
                                    setAuctionItemNowDisabled(true);
                                    setAuctionItemOfferDisabled(true);
                                    setAuctionItemTimerDisabled(false);
                                }
                            }}></Form.Check>
                        </div>

                        <div className='controllerFormInputs' style={auctionItemTimerDisabled == false && auctionItemNowDisabled == true && auctionItemOfferDisabled == true? {}: {"pointerEvents": "none", "opacity":0.7}}>
                            <Form.Label>{t("auctionControllerClosingTime")}</Form.Label>
                            <Datetime 
                                input={false}
                                displayTimeZone={"Europe/Helsinki"}
                                onChange={(e)=>{setOpenBiddingTime(e._d);}}
                            />
                            <Form.Text>
                                {t("auctionControllerCloseTimeDescription")}
                            </Form.Text>
                        </div>
                    </div>             
                </div>

                <div className='controllerFormImageInputDiv'>
                    <input required onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")} multiple></input>
                </div>

                </Modal.Body>
                
                <Modal.Footer className="ModalFooter">
                    <p className='errorMessage'>{message}</p>
                    {loading == false ?
                        <div>
                            <Button className='modalCloseButtonMargin' variant="secondary" onClick={()=>{resetValues();}}>
                                {t("close")}
                            </Button>
                            <Button variant="primary" type="submit"> 
                                {t("save")}
                            </Button>
                        </div>
                        :<div>
                            <Spinner  animation="border" variant="light"/>
                        </div>
                    }
                </Modal.Footer>
            </Form>
        </Modal>
    </div>);
}

export{AuctionControllerPost}