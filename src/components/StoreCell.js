import './StoreCell.css'
import { useCountdown } from "../functions/Countdown";
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';

const StoreCell = (d)=>{
    const countDownDate = d.data.closingTime;
    const [days, hours, minutes, seconds] = useCountdown(countDownDate);
    const {t} = useTranslation();

    const countDown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    let countDownIsActive = true;
    if (seconds < 0) {
        countDownIsActive = false;
    }
    const countDownOutput = countDownIsActive ? countDown : 'Auction has ended' // muokataanko loppuneet pois näkyvistä? //Tähän vaan se että api palauttaa auctionitemit uusin ensin ja kotisivu näyttää 4 uusinta -> vanhat suodattuu itestään pois kun sille tarve

    var url = "/Auction?auctionId="+d.data?.id
    var storeCellContentClassName = "fade-out "
    if(d?.fade == true){
        storeCellContentClassName = storeCellContentClassName + "fade-out-apply";
    }
    return(
        <div className="storeCellMainDiv square rounded">
            <Link to={url}>
                <div className='storeCellImgDiv'>
                    <img className="storeCellImg" src={d.data?.imageLink}/>
                </div>
            </Link>
            <Link to={url} className={storeCellContentClassName}>
                <div className='storeCellContentDiv rounded-bottom ' >
                            {/* style={d.data?.type == "Purchase" ? {backgroundColor: '#dadd0b'} : {backgroundColor: '#0437df'}} */}
                            {/* variant={d.data?.type == "Purchase" ? 'warning' : 'info'} */}
                           <Alert className='countdownContainerType' style={d.data?.saleType == "Purchase" ? {backgroundColor: '#3E215C', borderColor: '#3E215C'} : {backgroundColor: '#AB7E0E', borderColor: '#AB7E0E'}}  >
                                <p>{t("type")}: {d.data?.saleTypeId == 1 ? t("commission") : t("purchase")}</p>
                            </Alert> 

                    <h2>{d.data?.title}</h2>
                    <p>{d.data?.description}</p>
                    <div className='countdown-container'>
                        <h4>{countDownOutput}</h4>
                    </div>
                </div>
            </Link>
           
        </div>
    )
}


export {StoreCell};