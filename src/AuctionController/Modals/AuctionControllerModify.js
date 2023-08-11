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

const AuctionControllerModify = (e)=>{
    const {t} = useTranslation();
    const [cookies] = useCookies(['token']);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [imageFiles, setImageFiles] = useState(null);
    const [errors, setErrors] = useState([]);

    const [auctionItemModifyValidated, setAuctionIteModifyValidated] = useState(false);
    const [auctionItemModifyModal, setAuctionItemModifyModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pastClosingTime, setPastClosingTime] = useState("");
    const [auctionItemHours, setAuctionItemHours] = useState(null);
    const [auctionItemMinutes, setAuctionItemMinutes] = useState(null);
    const [auctionItemType, setAuctionItemType] = useState(1);
    const [visible, setVisible] = useState(1);
    const [selectedImages, setSelectedImages] = useState([]);

    const [auctionItemNowDisabled, setAuctionItemNowDisabled] = useState(false);
    const [auctionItemOfferDisabled, setAuctionItemOfferDisabled] = useState(false);
    const [auctionItemTimerDisabled, setAuctionItemTimerDisabled] = useState(false);

    const [startClosingTimeOnBid, setStartClosingTimeOnBid] = useState(null);
    const [openBiddingTime, setOpenBiddingTime] = useState(null);
    const [raiseClosingTimeInterval, setRaiseClosingTimeInterval] = useState(null);

    
    
    //functions
    const resetValues = ()=>{
        setMessage("");

        setImageFiles(null);
        setDescription("");
        setTitle("");
        setVisible(1);
        setAuctionItemType(1);
        setSelectedImages([]);

        setAuctionItemModifyModal(false);
        setLoading(false);
    }
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

    const handleModifyAuctionItemSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setAuctionIteModifyValidated(true);
        }

        //Converts hours and minutes to minutes. Checks that an image has been selected and that the time is valid
        var auctionItemTotalMinutes = Number.parseInt(event.target.auctionItemHours.value) * 60;
        if(event.target.auctionItemMinutes?.value != null && event.target.auctionItemMinutes?.value != "" && event.target.auctionItemMinutes?.value != undefined)
            auctionItemTotalMinutes = auctionItemTotalMinutes + Number.parseInt(event.target.auctionItemMinutes?.value);

        if(auctionItemTotalMinutes <= 0 || imageFiles == null && selectedImages?.length == 0){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            setLoading(true);
            event.preventDefault();
            modifyAuctionItem({
                Title: event.target.title.value,
                Description:event.target.description.value,
                auctionDurationMinutes: auctionItemTotalMinutes,
                startClosingTimeOnBid: startClosingTimeOnBid,
                openBiddingTime: openBiddingTime,
                Visible: visible,
                saleTypeId: auctionItemType,
                raiseClosingTimeInterval: event.target.raiseClosingTimeInterval.value  
            });
            setAuctionIteModifyValidated(false);
        }
    };


    //Api Calls
    const modifyAuctionItem = async(modifyBody)=>{

        const options = {
            method:'PUT',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${cookies.token}` },
            body:JSON.stringify(modifyBody)
        }

        //Tarkistaa että auctionitem joka on jo ei tule enään muokatuksi
        if( moment(new Date().getTime()).isAfter(moment(pastClosingTime))){
            setMessage("Cannot modify closed auctionitem");
        }
        else{
            var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/AuctionItems/"+e.selectedRowValue.id, options);
            var answer = await search.json();
            if(answer?.status == "Ok" && imageFiles != null){
                resetValues();
                e.postImages(answer.message, imageFiles);
            }
            else{
                resetValues();
                await e.fetchAuctionItems();
            }
        }

    }

    const fetchImages = async()=>{
        const options = {
            method: 'GET',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Images/"+e.selectedRowValue.id,options);
        var result = await search.json();
        if(result?.status != "Error" && result != undefined && result?.status != 404&& result?.status != 401&& result?.status != 403&& result?.status != 500){
            setSelectedImages(await result);
        }
    }

    const deleteSelectedImage = async(imageUrl)=>{
        const options = {
            method: 'DELETE',
            headers: {"Authorization": `Bearer ${cookies.token}`}
        }
        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Images/?ImageUrl="+imageUrl,options);
        var result = await search.json();
        if(result?.status == "Ok"){
            setSelectedImages([]);
            await fetchImages();
        }
    }

    useEffect(()=>{
        if(auctionItemModifyModal == true){
            fetchImages();
            setTitle(e.selectedRowValue?.title);
            setDescription(e.selectedRowValue?.description);
            setVisible(e.selectedRowValue.visible);
            setAuctionItemType(e.selectedRowValue.saleTypeId);
            setPastClosingTime(e.selectedRowValue.closingTime);
            setOpenBiddingTime(e.selectedRowValue.openBiddingTime);
            setStartClosingTimeOnBid(e.selectedRowValue.startClosingTimeOnBid);
            setRaiseClosingTimeInterval(e.selectedRowValue.raiseClosingTimeInterval);
            
            //Check if the user has used minutes through reminder
            if(e.selectedRowValue.auctionDurationMinutes % 60 != 0){
                setAuctionItemHours(Math.floor(e.selectedRowValue.auctionDurationMinutes/60));
                setAuctionItemMinutes(e.selectedRowValue.auctionDurationMinutes - Math.floor(e.selectedRowValue.auctionDurationMinutes/60) * 60); 
            }
            else{
                setAuctionItemHours(e.selectedRowValue.auctionDurationMinutes/60);
            }

            //Checks the users selected checkbox
            if(e.selectedRowValue.startClosingTimeOnBid == 1){
                setAuctionItemOfferDisabled(false);
                setAuctionItemTimerDisabled(true);
                setAuctionItemNowDisabled(true);
            }

                else if(e.selectedRowValue.openBiddingTime != null && e.selectedRowValue.openBiddingTime != ""){
                setAuctionItemTimerDisabled(false);
                setAuctionItemOfferDisabled(true);
                setAuctionItemNowDisabled(true);

            }
            else{
                setAuctionItemNowDisabled(false);
                setAuctionItemOfferDisabled(true);
                setAuctionItemTimerDisabled(true);
            }
            
            console.log(e.selectedRowValue);
        }
    },[auctionItemModifyModal]);

    //Rendering functions
    const renderImages = selectedImages.map((e)=>{
        return(<div>
            <img className='renderedImage' src={e}/>
            <CloseButton variant="white" onClick={()=>{deleteSelectedImage(e);}}></CloseButton>
        </div>)
    });

    return(
    <div>
        <Button disabled={e.selectedRow} onClick={()=>{setAuctionItemModifyModal(true);}}>{t("modify")}</Button>
        <div>
            <Modal show={auctionItemModifyModal} >
                <Form noValidate validated={auctionItemModifyValidated} onSubmit={handleModifyAuctionItemSubmit} >
                    <Modal.Header className="ModalHeader">
                        <Modal.Title>{t("auctionControllerModifyAuctionItem")}</Modal.Title>
                        <CloseButton variant="white" className='modalCloseButton' onClick={()=>{setAuctionItemModifyModal(false);}}></CloseButton>
                    </Modal.Header>

                    <Modal.Body className="ModalBody">
                    <div className='controllerFormInputs'>
                        <Form.Label>{t("title")}</Form.Label>
                        <Form.Control required type='text' value={title} placeholder={t("title")} onChange={(e)=>{setTitle(e.target.value);}} name='title' />
                    </div>

                    <div>
                        <Form.Label>{t("description")}</Form.Label>
                        <Form.Control required type='text' as="textarea" value={description} placeholder={t("description")} onChange={(e)=>{setDescription(e.target.value);}} name="description" />
                    </div>

                    <div className='controllerFormInputs'>
                        <Form.Label >{t("hidden")}</Form.Label>
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
                        <Form.Label>How long will the auction last once its started.</Form.Label>
                        
                        <Form.Control required min={0} placeholder={"0 Hours"}  type='number' value={auctionItemHours} onChange={(e)=>{setAuctionItemHours(e.target.value);}} name='auctionItemHours' />
                        <Form.Text>
                            Defines how many hours the auction will last, once its been opened.
                        </Form.Text>
                        <Form.Control min={0} placeholder={t("auctionControllerRaisePeriodPlaceHolder")}  type='number' max={60} value={auctionItemMinutes} onChange={(e)=>{setAuctionItemMinutes(e.target.value);}} name='auctionItemMinutes' />
                        <Form.Text>
                            Defines how many minutes the auction will last, once its been opened.
                        </Form.Text>
                    </div>

                    <div className='controllerFormInputs'>
                        <Form.Label>{t("auctionControllerRaisePeriod")}</Form.Label>
                        <Form.Control min={0} placeholder={t("auctionControllerRaisePeriodPlaceHolder")}  type='number' max={60} value={raiseClosingTimeInterval} onChange={(e)=>{setRaiseClosingTimeInterval(e.target.value);}} name='raiseClosingTimeInterval' />
                        <Form.Text>
                            {t("auctionControllerRaisePeriodDescription")}
                        </Form.Text>
                    </div>
                    <div className='controllerFormInputs'>
                        <h3>When will the timer start to go down?</h3>
                        <div className='auctionControllerPostCheckbox'>
                            <Form.Label htmlFor='auctionPostCheckNow'>Now</Form.Label>
                            <Form.Check id="auctionPostCheckNow" checked={auctionItemNowDisabled == false && auctionItemOfferDisabled == true && auctionItemTimerDisabled == true} disabled={auctionItemNowDisabled} onClick={(e)=>{ 
                                var checked = e.target.checked; 
                                if(checked == false){
                                    setAuctionItemNowDisabled(false);
                                    setAuctionItemOfferDisabled(false);
                                    setAuctionItemTimerDisabled(false);
                                }
                                else{
                                    setOpenBiddingTime(null);
                                    setStartClosingTimeOnBid(null);
                                    
                                    setAuctionItemNowDisabled(false);
                                    setAuctionItemOfferDisabled(true);
                                    setAuctionItemTimerDisabled(true);
                                }
                            }}></Form.Check>
                        </div>

                        <div  className='auctionControllerPostCheckbox'>
                            <Form.Label htmlFor='auctionPostCheckOffer'>After the first offer is made</Form.Label>
                            <Form.Check id="auctionPostCheckOffer"checked={auctionItemNowDisabled == true && auctionItemOfferDisabled == false && auctionItemTimerDisabled == true} disabled={auctionItemOfferDisabled} onClick={(e)=>{ 
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
                                <Form.Check id="auctionPostCheckTimer" checked={auctionItemNowDisabled == true && auctionItemOfferDisabled == true && auctionItemTimerDisabled == false} disabled={auctionItemTimerDisabled} onClick={(e)=>{ 
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
                                    initialViewDate={openBiddingTime}
                                    onChange={(e)=>{setOpenBiddingTime(e._d);}}
                                />
                                <Form.Text>
                                    {t("auctionControllerCloseTimeDescription")}
                                </Form.Text>
                            </div>
                        </div>             
                    </div>

                    <div className='controllerFormImageInputDiv'>
                        <input onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")} multiple></input>
                    </div>

                    <div className='auctionControllerModifyImagesDiv'>
                        {renderImages}
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
        </div>
    </div>)
}
export{AuctionControllerModify}