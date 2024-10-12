const LineHeader = ({ lineName }) => {
    return (
        <div className="line-header">
            <h1>{lineName}</h1>
            <div className="line-buttons">
                <button>Arriving</button>
                <button>Scheduled</button>
                <button>Northbound</button>
                <button>Southbound</button>
            </div>
        </div>
    );
};
export default LineHeader;
