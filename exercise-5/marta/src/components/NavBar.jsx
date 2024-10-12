import React from 'react';

export default function NavBar({ stations }) {
    return (
        <nav className="navbar">
            <label>Select your starting station</label>
            <ul>
                {stations.map((station, index) => (
                    <li key={index}>{station}</li>
                ))}
            </ul>
        </nav>
    );
}
