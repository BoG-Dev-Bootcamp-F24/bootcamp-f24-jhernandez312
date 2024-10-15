import React from 'react';

export default function Train({ train }) {
    const { DESTINATION, STATUS, LINE, DELAY } = train;

    const isOnTime = DELAY === 'T0S';

    return (
        <div className="train-card">
            <h3>{DESTINATION}</h3>
            <p>Line: {LINE}</p>
            <p>Status: {STATUS}</p>
            <p>On Time: {isOnTime ? 'Yes' : 'Delayed'}</p>
        </div>
    );
}
