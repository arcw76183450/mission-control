const launches = new Map();

let latestFlightNumber = 100;
const launch = {
    flightNumber: latestFlightNumber,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    destination: "Kepler-442 b",
    customer: ["NASA", "SpaceX"],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber,launch);

function getLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch,{
        flightNumber: latestFlightNumber,
        upcoming: true,
        customers: ["NASA", "SpaceX"],
        success: true
    }));
}

module.exports = {
    getLaunches,
    addNewLaunch,
}
