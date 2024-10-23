import React from 'react';

interface LineHeaderProps {
    lineName: string;
    handleLineChange: (line: string) => void;
    directionButtons: string[];
    activeFilters: string[]; // Pass the active filters
    toggleFilter: (filter: string) => void; // Function to toggle filters
}

const LineHeader: React.FC<LineHeaderProps> = ({ lineName, handleLineChange, directionButtons, activeFilters, toggleFilter }) => {
    return (
        <div className="line-header">
            <h1>{lineName}</h1>

            {/* Line color buttons */}
            <div className="line-buttons">
                <button onClick={() => handleLineChange("Gold")} style={{ backgroundColor: "gold" }}>Gold</button>
                <button onClick={() => handleLineChange("Red")} style={{ backgroundColor: "red" }}>Red</button>
                <button onClick={() => handleLineChange("Blue")} style={{ backgroundColor: "blue" }}>Blue</button>
                <button onClick={() => handleLineChange("Green")} style={{ backgroundColor: "green" }}>Green</button>
            </div>

            {/* Filter buttons */}
            <div className="line-filter-buttons">
                <button
                    className={activeFilters.includes('Arriving') ? 'active' : ''}
                    onClick={() => toggleFilter('Arriving')}
                >
                    Arriving
                </button>
                <button
                    className={activeFilters.includes('Scheduled') ? 'active' : ''}
                    onClick={() => toggleFilter('Scheduled')}
                >
                    Scheduled
                </button>
                {directionButtons.map((button, index) => (
                    <button key={index}>{button}</button>
                ))}
            </div>
        </div>
    );
};

export default LineHeader;
