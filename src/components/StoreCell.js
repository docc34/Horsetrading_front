import './StoreCell.css'
import { useCountdown } from "../functions/countdown";


const StoreCell = (d)=>{
    const countDownDate = d.data.closingTime;
    const [days, hours, minutes, seconds] = useCountdown(countDownDate);

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
            <a href={url}>
                <div className='storeCellImgDiv'>
                    <img className="storeCellImg" src={d.data?.imageLink}/>
                </div>
            </a>
            <a href={url} className={storeCellContentClassName}>
                <div className='storeCellContentDiv'>
                    <h2>{d.data?.title}</h2>
                    <p>{d.data?.description}</p>
                    <div className='countdown-container'>
                        <p className='countdownContainerType'>Type: {d.data?.type}</p>
                        <h4>{countDownOutput}</h4>
                    </div>
                </div>
            </a>
           
        </div>
    )
}


export {StoreCell};