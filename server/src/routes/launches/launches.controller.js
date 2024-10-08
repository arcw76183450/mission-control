const { 
    getLaunches, 
    scheduleNewLaunch,
    checkLaunchwithId,
    abortLaunchById
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res){
    return res.status(200).json(await getLaunches());
}

async function httpAddNewLaunch(req,res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "Missing required launch properties",
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Enter a valid date",
        })
    }
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);
    const existingLaunch = checkLaunchwithId(launchId)
    //if launch details doesn't exist
    if (!existingLaunch){
        return res.status(404).json({
            error: "No launch found",
        })
    }

    const abortedLaunch = await abortLaunchById(launchId);
    return res.status(200).json(abortedLaunch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}