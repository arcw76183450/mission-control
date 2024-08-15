const { default: axios } = require('axios');
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function checkLaunchwithId(id) {
    return await launchesDatabase.findOne({
        flightNumber: id
    })
}

function getLaunches() {
    return launchesDatabase.find({}, {
        _id: 0,
        __v: 0
    });
}

async function saveLaunch(launch) {
    const planet = planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error("No matching planets was found");
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launchData) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launchData, {
        upcoming: true,
        customers: ["NASA", "SpaceX"],
        success: true,
        flightNumber: newFlightNumber,
    })
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    return await launchesDatabase.updateOne({
        flightNumber: launchId
    },{
        upcoming: false,
        success: false
    });
}

async function loadLaunchData() {
    console.log('Loading launch data...');
    const response = await axios.post(SPACEX_API_URL,{
        query: {},
        options: {
            populate: [
                {
                    path:"rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path:"payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    })

}

module.exports = {
    getLaunches,
    scheduleNewLaunch,
    checkLaunchwithId,
    abortLaunchById,
}
