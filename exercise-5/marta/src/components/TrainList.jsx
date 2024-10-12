import React from 'react';
import Train from './Train';

export default function TrainList({ trains }) {
    return (
        <div className="train-list">
            {trains.map((train, index) => (
                <Train key={index} {...train} />
            ))}
        </div>
    );
}
