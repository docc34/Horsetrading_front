import './CountdownTimer.css'
import { useCountdown } from '../functions/Countdown';
import { useTranslation } from 'react-i18next';

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p>{value}</p>
        <p>{type}</p>
    </div>
    );
};

const CountdownTimer = ({targetDate}) => {
    const {t} = useTranslation();
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    
    if (days + hours + minutes + seconds <= 0) {
        
        return (
            <div className="expired-notice">
                <h4>{t("componentsCountdownExpiredNoticeTitle")}</h4>
                <p>{t("componentsCountdownExpiredNoticeDescription")}</p>
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

export { CountdownTimer }