import './CountdownTimer.css'
import { useCountdown } from '../functions/countdown';

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

export { CountdownTimer }