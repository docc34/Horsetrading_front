import './Registeration.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { PasswordVisibilityButton} from '../components/PasswordVisibilityButton'
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import {HandleErrors} from '../functions/HandleErrors';

const Registeration = ()=>{
    const {t} = useTranslation();
    const search = useLocation().search;
    const registerationLink = new URLSearchParams(search).get('registerationlink');
    
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    const [registerationValidated, setRegisterationValidated] = useState(false);
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState([]);
    
    const applyErrorClass= field =>((field in errors && errors[field]===false)?' invalid-field':'');
    const setFileFromInput = e =>{
        if(e.target.files && e.target.files[0]){
            var files = [];
            Array.from(e.target.files).forEach(file => {
                files.push(file);
            });
            console.log(e.target.files[0]);
            console.log(files);
            setImageFile(e.target.files[0]);
        }
        else{
            setImageFile(null);
        }
    }

    const handleRegisterationSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setRegisterationValidated(true);
        }
        else{
            event.preventDefault();

            //Formdata type is used to pass the imagefile to the api.
            const formData = new FormData();
            //Take userdata from form using the name attribute given to inputs.
            //This is done to enable use of autofill
            formData.append("Name",event.target.name.value);
            formData.append("Email",event.target.email.value);
            formData.append("Passwordhash",event.target.password.value);
            formData.append("CompanyName",event.target.companyName.value);
            formData.append("Address",event.target.address.value);
            formData.append("PostalCode",event.target.postalCode.value);
            formData.append("City",event.target.city.value);
            formData.append("Description",event.target.description.value);
            formData.append("ShortDescription",event.target.shortDescription.value);
            formData.append("YTunnus",event.target.yTunnus.value);
            formData.append("ProfilePicture",imageFile);

            registerUser(formData);


            if(message != "Error"){
                event.target.reset(); 
            }
            setRegisterationValidated(false);
        }
    };

    const registerUser = async(userData)=>{

        const options = {
            method:'POST',
            body:userData
        }

        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Register/?Link="+registerationLink,options);
        var result = await search.json();
        var validationResult = HandleErrors(result);
        
        if(validationResult.valid == true ){
            setMessage(result?.message);
        }
        else{
            setMessage(validationResult.message);
        }
    }

    return(<div className='registerationMainDiv'>
        <h1>{t('registrationTitle')}</h1>
        <p>{t("registerationDisclaimer")}</p>
        <Form className='registerationForm'noValidate validated={registerationValidated} onSubmit={handleRegisterationSubmit}>
            <h4>{t("companyInfo")}</h4>
            <div className='registerationFormDiv'>
                
                <div className='registerationFormInputs'>
                    <Form.Label>{t("companyname")}</Form.Label>
                    <Form.Control name="companyName" type='text' required autoFocus/>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>

                <div className='registerationFormInputs'>
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control name="name" type='text' required />
                    <Form.Text className="text-muted">
                        {t("registerationNameDescription")}
                    </Form.Text>
                </div>
                <div className='registerationFormInputs'>
                    <Form.Label>YTunnus</Form.Label>
                    <Form.Control name="yTunnus" type='text' maxLength={9}/>
                    <Form.Text className="text-muted">
                        {t("registerationYtunnusDescription")}
                    </Form.Text>
                </div>
            </div>

            <h4>{t("addressInfo")}</h4>
            <div className='registerationFormDiv'>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("address")}</Form.Label>
                    <Form.Control name="address" type='text' required />
                    <Form.Text className="text-muted">
                        {t("registerationAddressDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("postalcode")}</Form.Label>
                    <Form.Control name="postalCode" type='text' required />
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>

                <div className='registerationFormInputs'>
                    <Form.Label>{t("city")}</Form.Label>
                    <Form.Control name="city" type='text' required />
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
            </div>

            <h4>{t("description")}</h4>
            <div className='registerationFormDiv registrationDescriptionDiv'>
                <div className='registerationFormInputs registerationTextFields'>
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control name="description" as="textarea" required/>
                    <Form.Text className="text-muted">
                        {t("registerationDescriptionDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
                
                <div className='registerationFormInputs registerationTextFields'>
                    <Form.Label>{t("shortdescription")}</Form.Label>
                    <Form.Control name="shortDescription" as="textarea" />
                    <Form.Text className="text-muted">
                        {t("registerationShortDescriptionDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>


            </div>

            <h4>{t("contactInfo")}</h4>
            <div className='registerationFormDiv'>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control name="email" type='text' required/>
                    <Form.Text className="text-muted">
                        {t("registerationEmailDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>

                <div className='registerationFormInputs'>
                    <Form.Label>{t("password")}</Form.Label>
                    <div className='auctionOfferFormPasswordDiv'>
                        <Form.Control name="password" required type={passwordVisibility} placeholder={t("password")}  />
                        <PasswordVisibilityButton passwordVisibility={passwordVisibility} setPasswordVisibility={(e)=>{setPasswordVisibility(e)}}/>
                    </div>
                    <Form.Text className='auctionOfferFormPasswordText'>
                        {t("registerationPasswordDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationPasswordWarning")}
                    </Form.Control.Feedback>
                </div>
            </div>

            <h4>{t("profilePicture")}</h4>
            <div className='registrationFormDiv'>
                <div className='registrationFormImageInputDiv'>
                    <input required onChange={(e)=>{setFileFromInput(e);}} type={"file"} accept={'image/*'} id={"image-uploader"} className={"form-control"+applyErrorClass("imageSource")}></input>
                </div>
            </div>

            <div className='registerationButtonDiv'>
                <Button type="submit">{t("save")}</Button>
                <p className='registrationMessage'>{message}</p>
                {message == "New user created succesfully" ? 
                    <Nav >
                        <Nav.Link className='registrationLink'  href="/AuctionController">{t("registerationLogInLink")}</Nav.Link>
                    </Nav>
                : null}
            </div>
        </Form>

    </div>)
}

export{Registeration}