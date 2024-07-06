const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
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

saveLaunch(launch)

function checkLaunchwithId(id){
    return launches.get(id);
}

function getLaunches(){
    return launchesDatabase.find({},{
        _id:0,
        __v:0
    });
}

async function saveLaunch(launch){
    const planet = planets.findOne({
        keplerName: launch.target
    })

    if (!planet){
        throw new Error("No matching planets was found");
    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch,{
        upsert: true
    })
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
