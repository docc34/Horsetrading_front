import './CountdownTimer.css'
import { useCountdown } from '../functions/Countdown';
import { useTranslation } from 'react-i18next';
import moment  from 'moment';

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p>{value}</p>
        <p>{type}</p>
    </div>
    );
};

const CountdownTimer = ({closingTime, openBiddingTime}) => {
    const {t} = useTranslation();
    var countDownDate = closingTime;
    //Checks which date to use
    if(openBiddingTime != null && moment(new Date().getTime()).isBefore(moment(openBiddingTime))){
        countDownDate = openBiddingTime;
    }
    const [days, hours, minutes, seconds] = useCountdown(moment(countDownDate));

    if(countDownDate == null){
        return (
            <div className="expired-notice">
                <h4>{t("componentsCountdownWaitingNoticeTitle")}</h4>
                <p>{t("componentsCountdownWaitingNoticeDescription")}</p>
            </div>
        );
    }
    else if (days + hours + minutes + seconds <= 0) {
        
        return (
            <div className="expired-notice">
                <h4>{t("componentsCountdownExpiredNoticeTitle")}</h4>
                <p>{t("componentsCountdownExpiredNoticeDescription")}</p>
            </div>
        );
    } 
    else {
        return (
            <div >
                <div className="show-counter rounded">
                {
                   openBiddingTime != null && moment(new Date().getTime()).isBefore(moment(openBiddingTime)) ? 
                   <h2>{t("auctionStartsAfterTimerTitle")}:</h2> 
                   :null
                }
                </div>
                <div className="show-counter rounded">
                    <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
                    <p>:</p>
                    <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
                </div>
            </div>
        );
    }
};

export { CountdownTimer }