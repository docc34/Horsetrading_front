import './Registeration.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { PasswordVisibilityButton} from '../components/PasswordVisibilityButton'
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

const Registeration = ()=>{
    const {t} = useTranslation();
    const search = useLocation().search;
    const registerationLink = new URLSearchParams(search).get('registerationlink');
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [yTunnus, setYTunnus] = useState("");
    const [description, setDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    const [registerationValidated, setRegisterationValidated] = useState(false);
    const [message, setMessage] = useState("");
    
    const handleRegisterationSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setRegisterationValidated(true);
        }
        else{
            event.preventDefault();
            event.target.reset(); 
            registerUser();
            setRegisterationValidated(false);
        }
    };

    const registerUser = async()=>{
        const options = {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                name: name,
                email: email,
                passwordhash: password,
                companyName: companyName,
                address: address,
                postalCode: postalCode,
                city: city,
                description: description,
                shortDescription: description,
                yTunnus: yTunnus,
            })
        }

        var search = await fetch("https://horsetradingapidev.azurewebsites.net/api/Register/?Link="+registerationLink,options);
        var result = await search.json();
        if(await result?.status == "Ok" ){
            setMessage(result?.message);
        }
        else{
            setMessage(result?.message);
        }
    }

    return(<div className='registerationMainDiv'>
        <h1>{t('registerationTitle')}</h1>
        <p>Kerättyjä tietoja käytetään laskutukseen ja sivun toiminnallisuuden mahdollistamiseen.</p>
        <Form className='registerationForm'noValidate validated={registerationValidated} onSubmit={handleRegisterationSubmit}>
            <div className='registerationFormDiv'>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("companyname")}</Form.Label>
                    <Form.Control required autoFocus onBlur={(e)=>{setCompanyName(e.target.value)}}/>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>

                <div className='registerationFormInputs'>
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control required  onBlur={(e)=>{setName(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        {t("registerationNameDescription")}
                    </Form.Text>
                </div>
                <div className='registerationFormInputs'>
                    <Form.Label>YTunnus</Form.Label>
                    <Form.Control maxLength={9} onBlur={(e)=>{setYTunnus(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        {t("registerationYtunnusDescription")}
                    </Form.Text>
                </div>
            </div>
            <div className='registerationFormDiv'>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("address")}</Form.Label>
                    <Form.Control required  onBlur={(e)=>{setAddress(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        {t("registerationAddressDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("postalcode")}</Form.Label>
                    <Form.Control required type='number' onBlur={(e)=>{setPostalCode(e.target.value)}}/>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>

                <div className='registerationFormInputs'>
                    <Form.Label>{t("city")}</Form.Label>
                    <Form.Control required onBlur={(e)=>{setCity(e.target.value)}}/>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
            </div>

            <div className='registerationFormDiv'>
                <div className='registerationFormInputs registerationTextFields'>
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control as="textarea" required onBlur={(e)=>{setDescription(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        {t("registerationDescriptionDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
                
                <div className='registerationFormInputs registerationTextFields'>
                    <Form.Label>{t("shortdescription")}</Form.Label>
                    <Form.Control as="textarea" onBlur={(e)=>{setShortDescription(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        {t("registerationShortDescriptionDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationWarning")}
                    </Form.Control.Feedback>
                </div>
            </div>
                
            <div className='registerationFormDiv'>
                <div className='registerationFormInputs'>
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control required onBlur={(e)=>{setEmail(e.target.value)}}/>
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
                        <Form.Control required type={passwordVisibility} placeholder={t("password")} onBlur={(e)=>{setPassword(e.target.value);}} />
                        <PasswordVisibilityButton passwordVisibility={passwordVisibility} setPasswordVisibility={(e)=>{setPasswordVisibility(e)}}/>
                    </div>
                    <Form.Text className='auctionOfferFormPasswordText'>
                        {t("registerationPasswordDescription")}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {t("registerationPasswordWarning")}
                    </Form.Control.Feedback>
                </div>
                <div>
                    <Button type="submit">{t("save")}</Button>
                    <p>{message}</p>
                </div>
            </div>
        </Form>

    </div>)
}

export{Registeration}