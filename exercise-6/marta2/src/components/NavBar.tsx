interface NavBarProps {
    stations: string[];
}

const NavBar: React.FC<NavBarProps> = ({ stations }) => {
    console.log("Stations passed to NavBar:", stations);
    return (
        <div className="navbar">
            <h2>Select your starting station</h2>
            {stations.length > 0 ? (
                <ul>
                    {stations.map((station, index) => (
                        <li key={index}>{station}</li>
                    ))}
                </ul>
            ) : (
                <p>No stations available</p>
            )}
        </div>
    );
};

export default NavBar;
