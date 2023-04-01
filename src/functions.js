import './functions.css';
import { useCountdown } from './functions/Countdown';

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
    const countDownDate = d.data.formattedClosingTime;
    const [days, hours, minutes, seconds] = useCountdown(countDownDate);

    const countDown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    let countDownIsActive = true;
    if (seconds < 0) {
        countDownIsActive = false;
    }
    const countDownOutput = countDownIsActive ? countDown : 'Auction has ended' // muokataanko loppuneet pois näkyvistä?

    console.log(useCountdown(countDownDate))

    var url = "/Auction?auctionId="+d.data?.id
    var storeCellContentClassName = "fade-out "
    if(d?.fade == true){
        storeCellContentClassName = storeCellContentClassName + "fade-out-apply";
    }
    return(
        <div className="storeCellMainDiv square rounded">
            <h2>{countDownOutput}</h2>
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

export {handleInputChange, MakeStoreCell, CountdownTimer}