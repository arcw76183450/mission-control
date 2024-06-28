const launches = new Map();

let latestFlightNumber = 100;
const launch = {
    flightNumber: latestFlightNumber,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers: ["NASA", "SpaceX"],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber,launch);

function checkLaunchwithId(id){
    return launches.get(id);
}

function getLaunches(){
    return Array.from(launches.values());
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

function abortLaunchById(launchId){
    const abortedLaunch = launches.get(launchId);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;
    return abortedLaunch;
}

module.exports = {
    getLaunches,
    addNewLaunch,
    checkLaunchwithId,
    abortLaunchById,
}
