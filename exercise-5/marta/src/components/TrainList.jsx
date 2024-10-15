import React from 'react';

export default function TrainList({ trains }) {
    return (
        <div className="train-list">
            {trains.map((train, index) => (
                <div className="train-card" key={index}>
                    <div className="train-logo">M</div>
                    <div className="train-details">
                        <div className="station-info">
                            <span>{train.STATION}</span>
                            <span className="arrow">→</span>
                            <span>{train.DESTINATION}</span>
                        </div>
                        <div className="train-info">
                            <div className="train-line">{train.LINE}</div>
                            <div className={train.DELAY === 'T0S' ? 'on-time' : 'delayed'}>
                                {train.DELAY === 'T0S' ? 'On time' : `Delayed (${train.DELAY})`}
                            </div>
                        </div>
                    </div>
                    <div className="arrival-time">{train.WAITING_TIME}</div>
                </div>
            ))}
        </div>
    );
}
