import './functions.css';
import { relativeTimeRounding } from 'moment';
import { useEffect, useState, useRef } from 'react';
import * as signalR from "@microsoft/signalr";

//Määritetään yhteys bäckendin hubiin ja laitetaan se muuttujaan
// const [connection, setConnection] = useState("password");
const connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:44371/auctionhub")
.withAutomaticReconnect()
.build();
    //Aloitetaan yhteys hubiin
connection.start().catch(e=>console.log(e));
// connection.on("receiveMessage", (user,message)=>{
//     RecieveMessage(user,message);
// });
// const RecieveMessage = (user,message)=>{
//     console.log(user,message);
// }
//Määritetään "Kiinniotto" funktio. Kun joku lähettää viestin apilta suoritetaan frontista annettu funktio ja annetaan sille vastaanotetut parametrit 
const receiveMessage = (messageRecieveFunction)=>{
    connection.on("receiveMessage", (user,message)=>{
        messageRecieveFunction(user,message);
});
}

//Viestin lähetysfunktio
const sendSignalMessage = async (auctionItemId,Auctioneers)=>{
    //Lähetetään yksittäiseltä käyttäjältä kaikille yhdistetyille viesti apin kautta
    //KUtsutaan apin SendMessage nimistä hubia ja annetaan sille samat parametrit.
    await connection.send("SendMessage", auctionItemId, Auctioneers).then(x => console.log("sent"));
}

//Vanha validaatio metodi
const handleInputChange = (o)=>{
    if(o.target.value == null  || o.target.value == ""|| o.target.value == 0){
        o.target.setAttribute('style','border-color: red; border-width: 2px')
        return null;
    }
    else{
        o.target.setAttribute('style','')
        return o.target.value;
    }
}

const MakeStoreCell = (d)=>{
    var url = "/Auction?auctionId="+d.data?.id
    var storeCellContentClassName = "fade-out "
    if(d?.fade == true){
        storeCellContentClassName = storeCellContentClassName + "fade-out-apply";
    }
    return(
        <div className="storeCellMainDiv square rounded">
            <a href={url}> 
                <div className='storeCellImgDiv'>
                    <img className="storeCellImg" src={d.data?.imageLink}/>
                </div>
            </a>
            <a href={url} className={storeCellContentClassName}>
                <div>
                    <h2>{d.data?.title}</h2>
                    <hr className='storeCellLine'/>
                    <p >{d.data?.description}</p>
                </div>
            </a>
           
        </div>
    )
}

//#region
//Timer functions

    const useCountdown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();

        const [countDown, setCountDown] = useState(
            countDownDate - new Date().getTime()
        );

        useEffect(() => {
            const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        }, [countDownDate]);

        return getReturnValues(countDown);
    };

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    const DateTimeDisplay = ({ value, type, isDanger }) => {
        return (
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
            <p>{value}</p>
            <p>{type}</p>
        </div>
        );
    };

    const CountdownTimer = ({targetDate}) => {
        const [days, hours, minutes, seconds] = useCountdown(targetDate);
        
        if (days + hours + minutes + seconds <= 0) {
            
            return (
                <div className="expired-notice">
                    <h4>Congratulations to the winner!</h4>
                    <p>Bidding on the auction has closed. Congratulations to the winner!</p>
                </div>
            );
        } else {
            return (
                <div className="show-counter rounded">

                    <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
                    <p>:</p>
                    <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
                    
                </div>
            );
        }
    };
//#endregion

export {handleInputChange, MakeStoreCell, CountdownTimer, sendSignalMessage, receiveMessage}