import React from 'react';

interface LineHeaderProps {
    lineName: string;
    handleLineChange: (line: string) => void;
    directionButtons: string[];
    activeFilters: string[];
    toggleFilter: (filter: string) => void;
    selectedDirection: string | null;
    onDirectionChange: (direction: string) => void;
}

const LineHeader: React.FC<LineHeaderProps> = ({ lineName, handleLineChange, directionButtons, activeFilters, toggleFilter, selectedDirection, onDirectionChange }) => {
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

            {/* Combined Direction and Filter buttons in a row */}
            <div className="button-row">
                <div className="direction-buttons">
                    {directionButtons.map((direction, index) => (
                        <button
                            key={index}
                            onClick={() => onDirectionChange(direction.charAt(0))}
                            className={selectedDirection === direction.charAt(0) ? 'selected' : ''}
                        >
                            {direction}
                        </button>
                    ))}
                </div>

                <div className="line-filter-buttons">
                    <button
                        className={activeFilters.includes('Arriving') ? 'selected' : ''}
                        onClick={() => toggleFilter('Arriving')}
                    >
                        Arriving
                    </button>
                    <button
                        className={activeFilters.includes('Scheduled') ? 'selected' : ''}
                        onClick={() => toggleFilter('Scheduled')}
                    >
                        Scheduled
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LineHeader;
