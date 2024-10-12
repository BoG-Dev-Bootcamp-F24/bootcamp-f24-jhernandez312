export default function Train({ LINE, STATION, DESTINATION, DELAY, ARRIVAL_TIME }) {
    const isOnTime = DELAY === 'T0S';

    return (
        <div className="train-card">
            <div className="train-logo">M</div>
            <div className="train-details">
                <p className="train-station">{STATION}</p>
                <p className="train-destination">→ {DESTINATION}</p>
            </div>
            <div className="train-info">
                <span className="train-line">{LINE}</span>
                <span className={isOnTime ? 'on-time' : 'delayed'}>{isOnTime ? 'On time' : 'Delayed'}</span>
            </div>
            <div className="arrival-time">
                <p>{ARRIVAL_TIME} min</p>
            </div>
        </div>
    );
}
